import { useCallback, useContext, useEffect, useState } from 'react';
import bgImage from '@/assets/parallax/CoolIsland.png';
import { FullPageContainer } from '@/components/common/FullPageContainer.jsx';
import { useSearchParams } from 'react-router-dom';
import { useSendTransaction } from '/src/components/hooks/useSendTransaction';
import { useGetSC } from '/src/components/hooks/useGetSC';
import { LoginContext } from '@/LoginContext';
import Success from '@/components/success';
import { Button } from '@/components/common/Button.jsx';
import { useGetBalance } from '/src/components/hooks/useGetBalance';

export const ClaimIsland = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useContext(LoginContext);
  const [addition, setAddition] = useState('');
  const [custom, setCustom] = useState(false);
  const [judges, setJudges] = useState([]);
  const [execs, setExecs] = useState([]);
  const [error, setError] = useState('');
  const [sendTransaction] = useSendTransaction();
  const [getSC] = useGetSC();
  const [getBalance] = useGetBalance();
  const [islandSCID, setIslandSCID] = useState(searchParams.get('scid'));
  const [islandName, setIslandName] = useState(searchParams.get('name'));
  const [islandInWallet, setIslandInWallet] = useState(0);

  const Mint = useCallback(async (event) => {
    event.preventDefault();
    //check registry to see if name is taken
    const res0 = await getSC(state.scid_registry, false, true);
    var search = `aPRIVATE-ISLANDS${event.target.island.value}`;
    var island_scid = res0.stringkeys[search];
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
          value: event.target.island.value,
        },
      ],
      sc: 'RnVuY3Rpb24gSW5pdGlhbGl6ZVByaXZhdGUobmFtZSBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBFWElTVFMoIm5hbWUiKSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJuYW1lIixuYW1lKQozMCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksMSxTQ0lEKCkpCjQwIFNUT1JFKCJvd25lciIsIiIpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldEltYWdlKEltYWdlIFN0cmluZykgVWludDY0CjEwIElGIEFERFJFU1NfU1RSSU5HKFNJR05FUigpKSAhPSBMT0FEKCJvd25lciIpICYmIEFTU0VUVkFMVUUoU0NJRCgpKSAhPSAxIFRIRU4gR09UTyAxMDAKMjAgU1RPUkUoImltYWdlIixJbWFnZSkKMzAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLEFTU0VUVkFMVUUoU0NJRCgpKSxTQ0lEKCkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldFRhZ2xpbmUoVGFnbGluZSBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJ0YWdsaW5lIixUYWdsaW5lKQo0MCBTRU5EX0FTU0VUX1RPX0FERFJFU1MoU0lHTkVSKCksQVNTRVRWQUxVRShTQ0lEKCkpLFNDSUQoKSkKOTkgUkVUVVJOIDAKMTAwIFJFVFVSTiAxCkVuZCBGdW5jdGlvbgoKRnVuY3Rpb24gU2V0QmlvKEJpbyBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJiaW8iLEJpbykKNDAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLEFTU0VUVkFMVUUoU0NJRCgpKSxTQ0lEKCkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFNldE1ldGFkYXRhKEltYWdlIFN0cmluZywgVGFnbGluZSBTdHJpbmcsIEJpbyBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJpbWFnZSIsSW1hZ2UpCjMwIFNUT1JFKCJ0YWdsaW5lIixUYWdsaW5lKQo0MCBTVE9SRSgiYmlvIixCaW8pCjUwIFNFTkRfQVNTRVRfVE9fQUREUkVTUyhTSUdORVIoKSxBU1NFVFZBTFVFKFNDSUQoKSksU0NJRCgpKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCgpGdW5jdGlvbiBTZXRJUEZTKGNpZCBTdHJpbmcpIFVpbnQ2NAoxMCBJRiBBRERSRVNTX1NUUklORyhTSUdORVIoKSkgIT0gTE9BRCgib3duZXIiKSAmJiBBU1NFVFZBTFVFKFNDSUQoKSkgIT0gMSBUSEVOIEdPVE8gMTAwCjIwIFNUT1JFKCJpcGZzIixjaWQpCjUwIFNFTkRfQVNTRVRfVE9fQUREUkVTUyhTSUdORVIoKSxBU1NFVFZBTFVFKFNDSUQoKSksU0NJRCgpKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCgpGdW5jdGlvbiBEaXNwbGF5KCkgVWludDY0CjEwIElGIEFTU0VUVkFMVUUoU0NJRCgpKSAhPSAxIFRIRU4gR09UTyAxMDAKMjAgU1RPUkUoIm93bmVyIixBRERSRVNTX1NUUklORyhTSUdORVIoKSkpCjk5IFJFVFVSTiAwCjEwMCBSRVRVUk4gMQpFbmQgRnVuY3Rpb24KCkZ1bmN0aW9uIFJldHJpZXZlKCkgVWludDY0CjEwIElGIFNJR05FUigpICE9IEFERFJFU1NfUkFXKExPQUQoIm93bmVyIikpIFRIRU4gR09UTyAxMDAKMjAgU0VORF9BU1NFVF9UT19BRERSRVNTKFNJR05FUigpLDEsU0NJRCgpKQozMCBTVE9SRSgib3duZXIiLCIiKQo5OSBSRVRVUk4gMAoxMDAgUkVUVVJOIDEKRW5kIEZ1bmN0aW9uCg==',
    });

    let newIslandSCID = await sendTransaction(mintData);
    setIslandSCID(newIslandSCID);
    setSearchParams({
      status: 'minted',
      scid: newIslandSCID,
      name: event.target.island.value,
    });

    setIslandName(event.target.island.value);
  });

  const checkWalletForIsland = async () => {
    if (!islandSCID) return;
    const islandBalance = await getBalance(islandSCID);

    setIslandInWallet(islandBalance);
    if (islandBalance === 1) {
      setSearchParams({
        status: 'inWallet',
        name: islandName,
        scid: islandSCID,
      });
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
          <Success />
        ) : searchParams.get('status') === 'minted' ? (
          <div className="profile">
            <h3>Wait For Asset to Appear in Your Wallet</h3>
            <p>
              Wait a block or two and check your wallet for the newly minted
              Island asset.
            </p>
            <button onClick={() => checkWalletForIsland()}>Check Wallet</button>
          </div>
        ) : searchParams.get('status') === 'inWallet' ? (
          <div className="profile">
            <h3>Register your Island to the Private Islands Archipelago</h3>
            <p>
              This will register your island to the Private Islands Archipelago.
              Registration costs 0.1 Dero.
            </p>

            <button onClick={() => registerIsland()}>Register</button>
            {error}
          </div>
        ) : searchParams.get('status') === 'registered' ? (
          <div className="profile">
            <h3>Update Your Private Island Metadata</h3>
            <p>
              This will create a native Dero asset and send it to your wallet.
              This asset is the key to your Private Island.
            </p>
            <form onSubmit={updateMetaData}>
              <input placeholder="Image URL" id="image" type="text" />
              <input placeholder="Tagline" id="tagline" type="text" />
              <textarea
                placeholder="Description"
                rows="44"
                cols="80"
                id="bio"
              />

              <p>&nbsp;</p>
              <Button size="small" type={'submit'}>
                Create
              </Button>
            </form>
            {islandSCID && "here's the scid for your island " + islandSCID}
            {error}
          </div>
        ) : (
          <div className="profile">
            <h3>Mint Your Private Island</h3>
            <p>
              This will create a native Dero asset and send it to your wallet.
              This asset is the key to your Private Island.
            </p>
            <form onSubmit={Mint}>
              <input placeholder="Island Name" id="island" type="text" />

              <p>&nbsp;</p>
              <Button size="small" type={'submit'}>
                Create
              </Button>
            </form>
            {islandSCID && "here's the scid for your island " + islandSCID}
            {error}
          </div>
        )}
      </div>
    </FullPageContainer>
  );
};
