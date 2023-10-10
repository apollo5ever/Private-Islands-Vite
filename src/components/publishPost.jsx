import React from 'react';
import ReactDOM from 'react-dom';
import { LoginContext } from '../LoginContext';
import { useParams, useSearchParams } from 'react-router-dom';
import CryptoJS, { x64 } from 'crypto-js';
import to from 'await-to-js';
import Success from './success';
import { useGetSC } from './hooks/useGetSC';

//REDESIGNING PUBLISH POSTS TO SUBSCRIBERS

// need list of subscribers
// need to compare with snapshot of subscribers
//if dropouts, create new key and send to all subscribers
//if new subscribers, send same key to them
// encrypt post with key
// publish post in failed contract tx
// send txid to all subscribers

//IDEAS FOR STORING ENTIRE HISTORY
//post is encrypted
//cypher text is split into 400 character chunks
// each chunk is stored on chain with secret code embedded instructions to order them properly before decrypting
// user is sent txids, would still have to fetch multiple, so might as well just have one post be one tx if possible
// so each post could stand alone, cypher text stored on chain, new subs can never decrypt if the key is old..

// what I'm thinking could require too many txs now as the history grows..
// perhaps ipfs is the way for this
// but it wasn't working for dero forms anymore and I don't know why

//IDEAS FOR IPFS
// problem is ipfs is janky in browser...
// but let's say we store ipns link on chain
// publisher encrypts post
// publisher generates ipfs cid for cypher text
//publisher sends cid to integrated address along with private ipfs key
//service updates ipns record
//will read now if there is a way to append to ipns, or if there's a way to update ipns record client side in browser also

// HOW IT WORKS FOR SUBSCRIBER
//they receive a new key whenever one is generated
// they receive message with txid
// they combine these to read message

//PROBLEMS
//seems less private than sending CIDs
//new fetch and decrypt for each message
//maybe better to have a single tx encode all history but is that possible?
//certainly that would abuse the chain

export default function PublishPost(props) {
  const [state, setState] = React.useContext(LoginContext);
  const params = useParams();
  const [tierList, setTierList] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [randomKey, setRandomKey] = React.useState(true);
  const [getSC] = useGetSC();

  const getIsland = async () => {
    setTierList(
      state.myIslands[state.active].tiers.map((x) => (
        <li>
          <div className="tierList">
            <label for={`tier_${x.index}`}>{x.name}</label>
            <input id={`tier_${x.index}`} type="checkbox" />
          </div>
        </li>
      ))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res0 = await getSC(state.scid_subscriptions);
    var scData = res0.stringkeys;

    let supporterList = [];
    let checkedTiers = [];

    for (var i = 0; i < tierList.length; i++) {
      var check = `tier_${i}`;

      if (!e.target[check].checked) continue;
      var supporterSearch = new RegExp(
        state.myIslands[state.active].scid + i + `_E`
      );
      checkedTiers.push(i);

      let subs = Object.keys(scData)
        .filter((key) => supporterSearch.test(key))
        .filter((key) => scData[key] > new Date().getTime() / 1000)
        .map((x) => x.substring(0, 66));

      for (var s of subs) supporterList.push(s);
    }

    const post = {
      title: e.target.title.value,
      brief: e.target.brief.value,
      content: e.target.content.value,
      comments: [],
    };
    const key = CryptoJS.lib.WordArray.random(32).toString();
    console.log(key);

    const encryptedPost = CryptoJS.AES.encrypt(
      JSON.stringify(post),
      key
    ).toString();
    console.log(encryptedPost);
    let postObject = new Object({
      content: encryptedPost,
      date: new Date().getTime(),
      tiers: checkedTiers,
    });

    e.target.post = new Object({ value: postObject });
    props.editIsland(e);

    // const addPost= await state.ipfs.add(JSON.stringify(encryptedPost).toString())
    // const M =addPost.cid.toString()

    // var postData = JSON.stringify({
    //   "cid":M,
    //   "name":`${params.island}_mib`
    // });

    // const islandPinata = await fetch('https://api.filebase.io/v1/ipfs/pins', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json','authorization': `Bearer QzczQTJBNURDNTc1NUM3NUMzMTM6RTh4RDJVQkgzMldXenhmZ1JaMGtHU2FKaG4zYmR5R1JtSXEzMlowdDpwcml2YXRlaXNsYW5kcw==`
    //  },

    //         body:  postData
    // });

    /*
    let supporterList = Object.keys(scData)
    .filter(key=>supporterSearch.test(key))
    .filter(key=>scData[key]> new Date().getTime()/1000)
    .map(x=>new Object({
      "destination":x.substring(0,66),
      "amount":1,
      "payload_rpc":[{
              "name": "key",
              "datatype": "S",
              "value": key
      },
      {
        "name":"cid",
        "datatype":"S",
        "value":M
      }
]
      }))
*/
    // console.log(supporterList,new Date().getTime()*1000)
    const fee = encryptedPost.length * 3;

    const [err1, res1] = await to(
      deroBridgeApi.wallet('start-transfer', {
        scid: '8088b0089725de1d323276a0daa1f25cfab9c0b68ccb9318cbf6bf83f5a127c1',
        ringsize: 2,

        sc_rpc: [
          {
            name: 'entrypoint',
            datatype: 'S',
            value: 'StoreKeyString',
          },
          {
            name: 'k',
            datatype: 'S',
            value: `private.islands.${params.island}_${Date.now()}`,
          },
          {
            name: 'v',
            datatype: 'S',
            value: `00000${encryptedPost}00000`,
          },
        ],
      })
    );
    console.log(res1.data.result.txid);
    const txid = res1.data.result.txid;

    supporterList = supporterList.map(
      (x) =>
        new Object({
          destination: x,
          amount: 1,
          payload_rpc: [
            {
              name: 'key',
              datatype: 'S',
              value: key,
            },
            {
              name: 'txid',
              datatype: 'S',
              value: txid,
            },
          ],
        })
    );

    const [err, res] = await to(
      deroBridgeApi.wallet('start-transfer', {
        ringsize: 16,
        transfers: supporterList,
      })
    );

    setSearchParams({ status: 'success' });
  };

  React.useEffect(() => {
    getIsland();
  }, []);

  return (
    <div className="function">
      {searchParams.get('status') == 'success' ? (
        <Success />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <ul>{tierList}</ul>
            <label for="persistent">Save for future subscribers</label>
            <input id="persistent" type="checkbox" defaultChecked="yes" />
            <label for="random-key">Generate Random Encryption Key</label>
            <input
              id="random-key"
              type="checkbox"
              defaultChecked="yes"
              onChange={() => {
                setRandomKey(!randomKey);
              }}
            />
            {randomKey ? (
              ''
            ) : (
              <input type="password" id="key" placeholder="encryption key" />
            )}
            <input placeholder="title" id="title" type="text" />
            <input placeholder="teaser/tagline" id="brief" type="text" />
            <textarea
              placeholder="Write your masterpiece"
              rows="44"
              cols="80"
              id="content"
            ></textarea>

            <button type={'submit'}>Publish</button>
          </form>
        </div>
      )}
    </div>
  );
}
