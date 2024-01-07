import React, { useCallback, useContext, useEffect, useState } from 'react';
import bgImage from '@/assets/parallax/CoolIsland.png';
import { FullPageContainer } from '@/components/common/FullPageContainer.jsx';
import { useSearchParams } from 'react-router-dom';
import { useSendTransaction } from '/src/components/hooks/useSendTransaction';
import { useGetRandomAddress } from '../hooks/useGetRandomAddress';
import { useGetAddress } from '../hooks/useGetAddress';
import { useGetGasEstimate } from '../hooks/useGetGasEstimate';
import { useGetSC } from '/src/components/hooks/useGetSC';
import { LoginContext } from '@/LoginContext';
import { Button } from '@/components/common/Button.jsx';
import { useGetBalance } from '/src/components/hooks/useGetBalance';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../common/richTextEditor';

export const ClaimIsland = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useContext(LoginContext);
  const [addition, setAddition] = useState('');
  const [custom, setCustom] = useState(false);
  const [judges, setJudges] = useState([]);
  const [execs, setExecs] = useState([]);
  const [error, setError] = useState('');
  const [sendTransaction] = useSendTransaction();
  const [getRandomAddress] = useGetRandomAddress();
  const [getAddress] = useGetAddress();
  const [getGasEstimate] = useGetGasEstimate();
  const [getSC] = useGetSC();
  const [getBalance] = useGetBalance();
  const [islandSCID, setIslandSCID] = useState(searchParams.get('scid'));
  const [name, setName] = useState('');
  const [islandInWallet, setIslandInWallet] = useState(0);
  const [minting, setMinting] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    tagline: '',
    bio: '',
  });
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Claim = async (e) => {
    e.preventDefault();
    let scid = await mint(name);
    let randomAddress = await getRandomAddress();
    let userAddress = await getAddress();
    setMinting(true);
    let balance = await balanceCheck(scid);
    await register(name, scid, balance, userAddress, randomAddress);
    setMetadata(scid, balance, userAddress, randomAddress);
  };

  const balanceCheck = async (scid) => {
    let balance = 0;
    while (balance == 0) {
      console.log('check balance of ', scid);
      balance = await getBalance(scid);
      // await new Promise(resolve => setTimeout(resolve, 18000));
    }
    setMinting(false);
    return balance;
  };

  const setMetadata = async (scid, balance, userAddress, randomAddress) => {
    console.log('balance: ', balance);

    let metaDataData = {
      scid: scid,
      ringsize: 2,
      signer: userAddress,
      transfers: [
        {
          destination: randomAddress,
          burn: 1,
          scid: scid,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SetMetadata',
        },
        {
          name: 'Image',
          datatype: 'S',
          value: formData.image,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: formData.tagline,
        },
        {
          name: 'Bio',
          datatype: 'S',
          value: formData.bio,
        },
      ],
    };
    const gas_rpc = [
      {
        name: 'SC_ACTION',
        datatype: 'U',
        value: 0,
      },
      {
        name: 'SC_ID',
        datatype: 'H',
        value: scid,
      },
    ].concat(metaDataData.sc_rpc);

    metaDataData.gas_rpc = gas_rpc;

    let fees = await getGasEstimate(metaDataData);

    metaDataData.fees = fees;

    sendTransaction(metaDataData);
  };

  const mint = async (name) => {
    const res = await getSC(state.scid_registry, false, true);
    console.log('MINT FUNC - getSc res', res);
    var search = `aPRIVATE-ISLANDS${name}`;
    var island_scid = res.stringkeys[search];
    //----------Errors--------------------------
    if (island_scid) {
      setError('this island is taken');
      return;
    }

    //-----------------MINT----------------------------------
    const mintData = new Object({
      ringsize: 2,
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'InitializePrivate',
        },
        {
          name: 'name',
          datatype: 'S',
          value: name,
        },
      ],
      sc: 'RnVuY3Rpb24gSW5pdGlhbGl6ZVByaXZhdGUobmFtZSBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBFWElTVFMoIm5hbWUiKSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJuYW1lIixuYW1lKQozMCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksMSxTQ0lEKCkpCjQwIFNUT1JFKCJvd25lciIsIiIpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldEltYWdlKEltYWdlIFN0cmluZykgVWludDY0CjEwIElGIEFERFJFU1NfU1RSSU5HKFNJR05FUigpKSAhPSBMT0FEKCJvd25lciIpICYmIEFTU0VUVkFMVUUoU0NJRCgpKSAhPSAxIFRIRU4gR09UTyAxMDAKMjAgU1RPUkUoImltYWdlIixJbWFnZSkKMzAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLEFTU0VUVkFMVUUoU0NJRCgpKSxTQ0lEKCkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldFRhZ2xpbmUoVGFnbGluZSBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJ0YWdsaW5lIixUYWdsaW5lKQo0MCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksQVNTRVRWQUxVRShTQ0lEKCkpLFNDSUQoKSkKOTkgUkVUVVJOIDAKMTAwIFJFVFVSTiAxCkVuZCBGdW5jdGlvbgoKRnVuY3Rpb24gU2V0QmlvKEJpbyBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJiaW8iLEJpbykKNDAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLEFTU0VUVkFMVUUoU0NJRCgpKSxTQ0lEKCkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldE1ldGFkYXRhKEltYWdlIFN0cmluZywgVGFnbGluZSBTdHJpbmcsIEJpbyBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJpbWFnZSIsSW1hZ2UpCjMwIFNUT1JFKCJ0YWdsaW5lIixUYWdsaW5lKQo0MCBTVE9SRSgiYmlvIixCaW8pCjUwIFNFTkRfQVNTRVRfVE9fQUREUkVTUyhTSUdORVIoKSxBU1NFVFZBTFVFKFNDSUQoKSksU0NJRCgpKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCgpGdW5jdGlvbiBTZXRJUEZTKGNpZCBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJpcGZzIixjaWQpCjUwIFNFTkRfQVNTRVRfVE9fQUREUkVTUyhTSUdORVIoKSxBU1NFVFZBTFVFKFNDSUQoKSksU0NJRCgpKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCgpGdW5jdGlvbiBEaXNwbGF5KCkgVWludDY0CjEwIElGIEFTU0VUVkFMVUUoU0NJRCgpKSAhPSAxIFRIRU4gR09UTyAxMDAKMjAgU1RPUkUoIm93bmVyIixBRERSRVNTX1NUUklORyhTSUdORVIoKSkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFJldHJpZXZlKCkgVWludDY0CjEwIElGIFNJR05FUigpICE9IEFERFJFU1NfUkFXKExPQUQoIm93bmVyIikpIFRIRU4gR09UTyAxMDAKMjAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLDEsU0NJRCgpKQozMCBTVE9SRSgib3duZXIiLCIiKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCg==',
    });

    let newIslandSCID = await sendTransaction(mintData);
    console.log('new scid', newIslandSCID);
    setIslandSCID(newIslandSCID);
    return newIslandSCID;
  };
  const register = async (name, scid, balance, userAddress, randomAddress) => {
    console.log('balance: ', balance);
    const res = await getSC(state.scid_registry, false, true);
    var search = `aPRIVATE-ISLANDS${name}`;
    var island_scid = res.stringkeys[search];
    //----------Errors--------------------------
    if (island_scid) {
      setError('this island is taken');
      return;
    }

    const registrationData = {
      scid: state.scid_registry,
      ringsize: 2,
      transfers: [
        {
          destination: randomAddress,
          burn: 10000,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'RegisterAsset',
        },
        {
          name: 'name',
          datatype: 'S',
          value: name,
        },
        {
          name: 'collection',
          datatype: 'S',
          value: 'PRIVATE-ISLANDS',
        },
        {
          name: 'scid',
          datatype: 'S',
          value: scid,
        },
        {
          name: 'index',
          datatype: 'U',
          value: 0,
        },
      ],
    };

    sendTransaction(registrationData);
  };

  const checkWalletForIsland = async () => {
    if (!islandSCID) return;
    const islandBalance = await getBalance(islandSCID);

    console.log('ISLAND BALANCE FOR WALLEt CHECK', islandBalance, islandSCID);

    setIslandInWallet(islandBalance);
    if (islandBalance === 1) {
    }
  };

  const registerIsland = async () => {
    //check registry to see if name is taken
    const res0 = await getSC(state.scid_registry, false, true);
    var search = `aPRIVATE-ISLANDS${islandName}`;
    var island_scid = res0.stringkeys[search];
    //----------Errors--------------------------
    if (island_scid) {
      setError('this island is taken');
      return;
    }

    const registrationData = {
      scid: state.scid_registry,
      ringsize: 2,
      transfers: [
        {
          destination: state.randomAddress,
          burn: 10000,
        },
        {
          destination: state.randomAddress,
          burn: 1,
          scid: islandSCID,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'RegisterAsset',
        },
        {
          name: 'name',
          datatype: 'S',
          value: islandName,
        },
        {
          name: 'collection',
          datatype: 'S',
          value: 'PRIVATE-ISLANDS',
        },
        {
          name: 'scid',
          datatype: 'S',
          value: islandSCID,
        },
        {
          name: 'index',
          datatype: 'U',
          value: 0,
        },
      ],
    };

    sendTransaction(registrationData);
    setSearchParams({
      status: 'registered',
      name: islandName,
      scid: islandSCID,
    });
  };
  const updateMetaData = async (event) => {
    event.preventDefault();

    let fee;
    if (event.target.bio.value.length > 380) fee = 10000;

    const metaDataData = {
      scid: islandSCID,
      ringsize: 2,
      fees: fee,
      transfers: [
        {
          destination: state.randomAddress,
          burn: 1,
          scid: islandSCID,
        },
      ],
      sc_rpc: [
        {
          name: 'entrypoint',
          datatype: 'S',
          value: 'SetMetadata',
        },
        {
          name: 'Image',
          datatype: 'S',
          value: event.target.image.value,
        },
        {
          name: 'Tagline',
          datatype: 'S',
          value: event.target.tagline.value,
        },
        {
          name: 'Bio',
          datatype: 'S',
          value: event.target.bio.value,
        },
      ],
    };

    sendTransaction(metaDataData);
    setSearchParams({ status: 'success', name: islandName, scid: islandSCID });
  };

  const selectAddition = (e) => {
    e.preventDefault();
    setAddition(e.target.value);
  };

  return (
    <FullPageContainer bgImage={bgImage} rightPct={-75}>
      <h1 className="mb-6 text-4xl font-bold">Mint Your Private Island</h1>
      <div className="">
        {searchParams.get('status') === 'success' ? (
          navigate('/archipelago')
        ) : searchParams.get('status') === 'minted' ? (
          <div className="rounded-2xl border border-accent p-4 text-xl">
            Step 2 of 3:
            <div className="py-2">Wait For Asset to Appear in Your Wallet</div>
            <div className="py-2">
              Blocks average 18 seconds so give it a minute or so & check your
              wallet for the newly minted Island asset.
            </div>
            <Button size="small" handleClick={() => checkWalletForIsland()}>
              Check Wallet
            </Button>
          </div>
        ) : searchParams.get('status') === 'inWallet' ? (
          <div className="rounded-2xl border border-accent p-4 text-xl">
            Step 3 of 3:
            <div className="py-2">
              Register your Island to the Private Islands Archipelago
            </div>
            <div className="py-2">
              This will register your island to the Private Islands Archipelago.
            </div>
            <FlexBoxRow justify="start">
              <div className="px-3 font-bold">
                Registration costs
                <span className="font-serif text-2xl"> 0.1 </span> Dero.
              </div>
              <Button size="small" handleClick={() => registerIsland()}>
                Register
              </Button>
            </FlexBoxRow>
            {error && (
              <FlexBoxRow className="my-3 rounded border border-error bg-info text-2xl text-error">
                {error}
              </FlexBoxRow>
            )}
          </div>
        ) : searchParams.get('status') === 'registered' ? (
          <div className="profile">
            <div className="text-2xl">Update Your Private Island Metadata</div>
            <div>This asset is the key to your Private Island.</div>
            {islandSCID &&
              "This is your islands smart contract id (you don't need to save this) " +
                islandSCID}
            <form onSubmit={updateMetaData}>
              <FlexBoxColumn align="start">
                <input
                  className="input input-bordered mx-2 w-full max-w-xs"
                  placeholder="Image URL"
                  id="image"
                  type="text"
                />
                <input
                  className="input input-bordered mx-2 w-full max-w-xs"
                  placeholder="Tagline"
                  id="tagline"
                  type="text"
                />
                <textarea
                  className="mb-2 rounded"
                  placeholder="Description (Can embed HTML)"
                  rows="20"
                  cols="80"
                  id="bio"
                />
                <Button size="small" type={'submit'} className="self-center">
                  Create
                </Button>
              </FlexBoxColumn>
            </form>
            {error && (
              <FlexBoxRow className="my-3 rounded border border-error bg-info text-2xl text-error">
                {error}
              </FlexBoxRow>
            )}
          </div>
        ) : (
          <div className="">
            <div className="text-2xl">Mint Your Private Island</div>
            <div className="text-xl">
              This will create a native Dero asset and send it to your wallet.
              This asset is the key to your Private Island.
            </div>

            <div className="rounded-2xl border border-accent p-4 text-xl">
              <form onSubmit={Claim}>
                <input
                  className="input input-bordered mx-2 w-full max-w-xs"
                  placeholder="Island Name"
                  id="island"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input input-bordered mx-2 w-full max-w-xs"
                  placeholder="Image URL"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  type="text"
                />
                <input
                  className="input input-bordered mx-2 w-full max-w-xs"
                  placeholder="Tagline"
                  id="tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  type="text"
                />
                <RichTextEditor
                  name="bio"
                  editorHtml={editorHtml}
                  setEditorHtml={setEditorHtml}
                  bio={formData.bio}
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
                />

                <Button size="small" type={'submit'}>
                  Create
                </Button>
              </form>
              {minting && 'Waiting for confirmation... DO NOT LEAVE PAGE'}

              {error && (
                <FlexBoxRow className="my-3 rounded border border-error bg-info text-2xl text-error">
                  {error}
                </FlexBoxRow>
              )}
            </div>
          </div>
        )}
      </div>
    </FullPageContainer>
  );
};
