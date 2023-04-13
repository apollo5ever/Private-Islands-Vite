import React from 'react'
import {NavLink, useSearchParams} from 'react-router-dom'
import {useSendTransaction} from '../useSendTransaction'
import {useGetSC} from '../useGetSC'
import {LoginContext} from '../LoginContext';
import Success from './success'
import {Button, Card} from 'react-daisyui'
import {FlexBoxRow} from '@/components/common/FlexBoxRow.jsx';
import {FlexBoxColumn} from '@/components/common/FlexBoxColumn.jsx';
import {Input} from '@/components/common/Input.jsx';
import {Textarea} from '@/components/common/Textarea.jsx';
import {Checkbox} from "@/components/common/Checkbox.jsx";


export default function ClaimIsland() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = React.useContext(LoginContext);
  const [addition, setAddition] = React.useState('')
  const [custom, setCustom] = React.useState(false)
  const [judges, setJudges] = React.useState([])
  const [execs, setExecs] = React.useState([])
  const [error, setError] = React.useState('')
  const [sendTransaction] = useSendTransaction()
  const [getSC] = useGetSC()

  const handleChange = e => {
    if (e.target.value === 'custom') setCustom(true)
    else {
      setCustom(false)
    }
  }

  function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const getJudges = React.useCallback(async () => {
    const res = await getSC(state.scid)
    var search = new RegExp(`.*_j`)
    var scData = res.stringkeys //.map(x=>x.match(search))
    const judgeList = Object.keys(scData)
      .filter(key => search.test(key))
      .filter(key => scData[key] == 1 || scData[key] == 3)
      .map(key => <option value={key.substring(0, key.length - 2)}>{key.substring(0, key.length - 2)}</option>)

    setJudges(judgeList)

    const execList = Object.keys(scData)
      .filter(key => search.test(key))
      .filter(key => scData[key] == 2 || scData[key] == 3)
      .map(key => <option value={key.substring(0, key.length - 2)}>{key.substring(0, key.length - 2)}</option>)

    setExecs(execList)
  })

  const DoIt = React.useCallback(async (event) => {
    event.preventDefault();
    const res0 = await getSC(state.scid)
    var search = event.target.island.value + '_O'
    var owner = res0.stringkeys[search]
    var index = 0
    var burn = 1000
    var transfers = []

    if (state.cocoBalance >= burn) {
      transfers.push({
        'destination': state.randomAddress,
        'scid': state.coco,
        'burn': burn
      })
    } else {
      transfers.push({
        'destination': state.randomAddress,
        'burn': burn * 100

      })
    }

    //----------Errors--------------------------
    if (owner) {
      setError('this island is taken')
      return
    }

    //-----------------Basic Island------------------------------
    var M = 'M'
    var islandMeta = {
      name: event.target.island.value,
      image: event.target.image.value,
      tagline: event.target.tagline.value,
      bio: event.target.bio.value,
      tiers: []
    }
    if (addition != 'sub') {
      var islandData = JSON.stringify({
        'pinataOptions': {
          'cidVersion': 0
        },
        'pinataMetadata': {
          'name': event.target.island.value,
          'keyvalues': {}
        },
        'pinataContent': islandMeta
      });

      const islandPinata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`
        },

        body: islandData
      });

      const addIsland = await state.ipfs.add(JSON.stringify(islandMeta).toString())
      M = addIsland.cid.toString()
    }

    if (addition === '') {
      const txData = new Object(
        {
          'scid': state.scid,
          'ringsize': 2,
          'transfers': transfers,
          'sc_rpc': [{
            'name': 'entrypoint',
            'datatype': 'S',
            'value': 'IVU'
          },
            {
              'name': 'H',
              'datatype': 'S',
              'value': event.target.island.value
            },
            {
              'name': 'M',
              'datatype': 'S',
              'value': M
            },
            {
              'name': 'j',
              'datatype': 'U',
              'value': parseInt(event.target.j.value)
            }
          ]
        }
      )
      sendTransaction(txData)
    }

    //---------------MESSAGE IN BOTTLE Subscriptions---------------------------------
    else if (addition == 'sub') {
      var interval = 0
      console.log(event.target.wl.value)
      if (custom) interval = event.target.custom - interval.value
      else {
        interval = event.target.interval.value
      }
      islandMeta.tiers = [

        {
          name: event.target.tierName.value,
          perks: event.target.perks.value,
          index: 0
        }

      ]
      if (event.target.wl.checked) {
        var whitelisted = 1
      } else {
        var whitelisted = 0
      }


      var subData = JSON.stringify({
        'pinataOptions': {
          'cidVersion': 0
        },
        'pinataMetadata': {
          'name': event.target.island.value,
          'keyvalues': {}
        },
        'pinataContent': islandMeta
      });

      const subPinata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`
        },

        body: subData
      });

      const addSub = await state.ipfs.add(JSON.stringify(islandMeta).toString())
      const M = addSub.cid.toString()
      const txData = new Object(
        {
          'scid': state.scid,
          'ringsize': 2,
          'transfers': transfers,
          'sc_rpc': [{
            'name': 'entrypoint',
            'datatype': 'S',
            'value': 'AOMT'
          },
            {
              'name': 'Am',
              'datatype': 'U',
              'value': parseInt(event.target.amount.value * 100000)
            },
            {
              'name': 'I',
              'datatype': 'U',
              'value': parseInt(interval)
            },
            {
              'name': 'L',
              'datatype': 'U',
              'value': parseInt(event.target.limit.value)
            },
            {
              'name': 'Ad',
              'datatype': 'S',
              'value': event.target.address.value
            },
            {
              'name': 'H',
              'datatype': 'S',
              'value': event.target.island.value
            },
            {
              'name': 'i',
              'datatype': 'U',
              'value': 0
            },
            {
              'name': 'W',
              'datatype': 'U',
              'value': whitelisted
            },
            {
              'name': 'M',
              'datatype': 'S',
              'value': M
            },
            {
              'name': 'j',
              'datatype': 'U',
              'value': parseInt(event.target.j.value)
            }
          ]
        }
      )
      sendTransaction(txData)

//------------------SMOKE SIGNALS-------------------------------------
    } else if (addition === 'ss') {
      var signalMeta = {
        name: event.target.fundName.value,
        image: event.target.fundPhoto.value,
        tagline: event.target.fundTagline.value,
        description: event.target.description.value
      }

      var signalData = JSON.stringify({
        'pinataOptions': {
          'cidVersion': 0
        },
        'pinataMetadata': {
          'name': event.target.island.value + '_SmokeSignal_0_' + event.target.fundName.value,
          'keyvalues': {}
        },
        'pinataContent': signalMeta
      });

      const signalPinata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`
        },

        body: signalData
      });


      const addSignal = await state.ipfs.add(JSON.stringify(signalMeta).toString())
      const m = addSignal.cid.toString()
      var deadline = new Date(event.target.deadline.value).getTime() / 1000

      const txData = new Object(
        {
          'scid': state.scid,
          'ringsize': 2,
          'transfers': transfers,
          'sc_rpc': [{
            'name': 'entrypoint',
            'datatype': 'S',
            'value': 'NF'
          },
            {
              'name': 'G',
              'datatype': 'U',
              'value': parseInt(event.target.goal.value * 100000)
            },
            {
              'name': 'D',
              'datatype': 'U',
              'value': deadline
            },
            {
              'name': 'A',
              'datatype': 'S',
              'value': event.target.address.value
            },
            {
              'name': 'H',
              'datatype': 'S',
              'value': event.target.island.value
            },
            {
              'name': 'i',
              'datatype': 'U',
              'value': 0
            },
            {
              'name': 'M',
              'datatype': 'S',
              'value': M
            },
            {
              'name': 'm',
              'datatype': 'S',
              'value': m
            },
            {
              'name': 'j',
              'datatype': 'U',
              'value': parseInt(event.target.j.value)
            }
          ]
        }
      )
      sendTransaction(txData)
//----------------------BURIED TREASURES-------------------------------
    } else {
      const res0 = await getSC(state.scid)
      var executer = event.target.executer.value
      if (executer == 'self') executer = event.target.island.value

      var judge = event.target.judge.value
      if (judge == 'self') judge = event.target.island.value

      var expiry = new Date(event.target.expiry.value).getTime() / 1000 + new Date().getTimezoneOffset() * 60
      var treasureMeta = {
        'name': event.target.bountyName.value,
        'image': event.target.bountyPhoto.value,
        'expiry': expiry,
        'tagline': event.target.tagline.value,
        'description': event.target.description.value,
        'judges': [judge],
        'executers': [executer],
        'island': event.target.island.value
      }

      var treasureData = JSON.stringify({
        'pinataOptions': {
          'cidVersion': 0
        },
        'pinataMetadata': {
          'name': event.target.island.value + '_Buried Treasure_0_' + event.target.bountyName.value,
          'keyvalues': {}
        },
        'pinataContent': treasureMeta
      });

      const treasurePinata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjc5NzU5MS02OGUxLTQyNzAtYjZhMy01NjBjN2Y3M2IwYTMiLCJlbWFpbCI6ImJhY2tlbmRAYW1icm9zaWEubW9uZXkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDgzZTJkMGQ2Yzg2YTBhNjlkY2YiLCJzY29wZWRLZXlTZWNyZXQiOiJlN2VlMTE4MWM2YTBlN2FmNjQ0YmUzZmEyYmU1ZWY5ZWFmMmNmMmYyYzc0NWQzZGIxNDdiMThhOTU5NWMwZDNlIiwiaWF0IjoxNjYxMTk1NjUxfQ.9Pz2W_h7zCiYyuRuVySKcDwA2fl_Jbm6QDulihAIpmo`
        },

        body: treasureData
      });

      const addTreasure = await state.ipfs.add(JSON.stringify(treasureMeta).toString())
      const m = addTreasure.cid.toString()

      transfers = []
      if (state.cocoBalance < burn) {
        transfers.push({
          'destination': state.randomAddress,
          'burn': burn * 100 + parseInt(event.target.treasure.value) * 100000

        })
      } else {
        transfers.push({

            'scid': state.coco,
            'burn': burn
          },
          {
            'destination': state.randomAddress,
            'burn': parseInt(event.target.treasure.value) * 100000
          })
      }
      if (event.target.judge.value != 'self') {

        const judgeAddress = hex2a(res0.stringkeys[`${event.target.judge.value}_O`])
        const judgeMsg = new Object(
          {
            'ringsize': 2,
            'transfers': [
              {
                'destination': judgeAddress,
                'amount': 1,

                'payload_rpc': [
                  {
                    'name': 'C',
                    'datatype': 'S',
                    'value': 'You have been nominated for bounty judge by: ' + event.target.island.value
                  }]
              }]
          }
        )
        sendTransaction(judgeMsg)
      }
      if (event.target.executer.value != 'self') {
        const execAddress = hex2a(res0.stringkeys[`${event.target.executer.value}_O`])
        const execMsg = new Object(
          {
            'ringsize': 2,
            'transfers': [
              {
                'destination': execAddress,
                'amount': 1,

                'payload_rpc': [
                  {
                    'name': 'C',
                    'datatype': 'S',
                    'value': 'You have been nominated for bounty executer by: ' + event.target.island.value
                  }]
              }]
          }
        )
        sendTransaction(execMsg)
      }
      const btTX = new Object(
        {
          'scid': state.scid,
          'ringsize': 2,
          'transfers': transfers,
          'sc_rpc': [{
            'name': 'entrypoint',
            'datatype': 'S',
            'value': 'BT'
          },
            {
              'name': 'H',
              'datatype': 'S',
              'value': event.target.island.value
            },
            {
              'name': 'i',
              'datatype': 'U',
              'value': 0
            },
            {
              'name': 'J',
              'datatype': 'S',
              'value': judge
            },
            {
              'name': 'X',
              'datatype': 'S',
              'value': executer
            },
            {
              'name': 'E',
              'datatype': 'U',
              'value': expiry
            },
            {
              'name': 'M',
              'datatype': 'S',
              'value': M
            },
            {
              'name': 'm',
              'datatype': 'S',
              'value': m
            },
            {
              'name': 'j',
              'datatype': 'U',
              'value': parseInt(event.target.j.value)
            }
          ]
        }
      )
      sendTransaction(btTX)
    }
    setSearchParams({'status': 'success'})
  })
  const selectAddition = e => {
    e.preventDefault();
    setAddition(e.target.value)
  }

  React.useEffect(() => {
    getJudges()

  }, [state])


  return (
    <FlexBoxRow className='p-8'>
      {searchParams.get('status') === 'success' ?
        <Success />
        : <div className=''>
          <Card side='lg' bordered='true' image-full='false' className='bg-secondary shadow-md'>
            <Card.Body>
              <Card.Title className='justify-center min-w-full'>
                <div className='prose min-w-full'>
                  <NavLink to={`/archipelago`} className='no-underline'>
                    <h1 className='text-center'>Claim Your Private Island</h1>
                    <h3 className='text-center'>Claiming a new island will cost 1000 coco. <br />If you don't have
                      enough coco
                      it will instead cost 1 Dero.</h3>
                  </NavLink>
                </div>
              </Card.Title>
              <form onSubmit={DoIt}>
                <FlexBoxColumn>
                  <Input id='island' type='text' placeholder='Island Name' />
                  <Input id='image' type='text' placeholder='Image URL' />
                  <Input id='tagline' type='text' placeholder='Tagline' />
                  <Textarea id='bio' rows='10' cols='80' placeholder='Description' />
                  <div className='prose py-4 text-center'>
                    <p>Would you like to make yourself available as judge or executor for Buried Treasure Bounties?</p>
                    <select id='j' className='select select-bordered w-full max-w-xs'>
                      <option disabled selected>Roles</option>
                      <option value='0'>Neither</option>
                      <option value='1'>Judge</option>
                      <option value='2'>Executer</option>
                      <option value='3'>Both</option>
                    </select>
                    <p>You can add either a subscription tier, a smoke signal fundraiser, or a buried treasure bounty
                      for no additional cost.</p>
                    <select id='addition' onChange={selectAddition} className='select select-bordered w-full max-w-xs'>
                      <option disabled selected>Add-ons</option>
                      <option value=''>Just the Island for Now</option>
                      <option value='sub'>Subscription</option>
                      <option value='ss'>Fundraiser</option>
                      <option value='bt'>Bounty</option>
                    </select>
                  </div>
                  {addition === 'sub' ? <>
                      <div className='prose py-4 text-center'>
                        <h3>Message-In-A-Bottle Subscription</h3>
                        <p>This is where you can post content for your subscribers. All parameters may be changed in future.</p>
                        <Input placeholder='Tier Name' id='tierName' type='text' />
                        <Input placeholder='Perks' id='perks' type='text' />
                        <Input placeholder='address' id='address' type='text' />
                        <Input placeholder='max number of subscribers' id='limit' type='text' />
                        <p>Can anybody subscribe or will there be a whitelist?</p>
                        <Checkbox id='wl' label='Whitelisted' />
                        <Input placeholder='Amount(Dero)' id='amount' type='text' />
                        <select onChange={handleChange} id='interval' className='select select-bordered w-full max-w-xs'>
                          <option disabled selected>Time Period</option>
                          <option value='2629800'>Monthly</option>
                          <option value='7889400'>Quarterly</option>
                          <option value='31557600'>Annual</option>
                          <option value='custom'>Custom</option>
                        </select>
                        {custom ?
                          <Input placeholder='Subscription Interval in Seconds' id='custom-interval' type='text' /> : ''}

                      </div>
                    </> :
                    addition === 'ss' ? <>
                        <div className='prose py-4 text-center'>
                          <h3>Smoke Signal Fundraiser</h3>
                          <p>
                            Set a fundraising goal and a deadline. If your goal is met before the deadline, funds can be
                            withdrawn to the specified address. Otherwise, funds are returned to supporters. All
                            parameters are immutable.
                          </p>
                          <Input type='text' placeholder='Smoke Signal Name' id='fundName' />
                          <Input type='text' placeholder='Image URL' id='fundPhoto' />
                          <Input type='text' placeholder='Tagline' id='fundTagline' />
                          <p>Deadline</p>
                          <Input type='date' id='deadline' name='deadline' />
                          <br /><br />
                          <Textarea placeholder='Description' rows='10' cols='80' id='description' />
                          <Input placeholder='Goal' id='goal' type='text' />
                          <Input placeholder='Address' id='address' type='text' />
                        </div>
                      </> :
                      addition === 'bt' ?
                        <>
                        <div className='prose py-4 text-center'>
                          <h3>Buried Treasure Bounty</h3>
                          <p>Bury some treasure on your private island. Others can add to the treasure, and it will
                            only
                            be
                            released once the task has been accomplished. Here you must nominate an existing island
                            operator
                            to act as judge, and another to act as executor. All parameters are immutable.</p>
                          <Input type='text' placeholder='Buried Treasure Name' id='bountyName' />
                          <Input type='text' placeholder='Image URL' id='bountyPhoto' />
                          <Input type='text' placeholder='Tagline' id='bountyTagline' />
                          <p>Expiry <br /><span className='prose-sm'>(if the task isn't complete before this date, supporters can retrieve their funds)</span></p>
                          <Input type='date' id='expiry' name='expiry' />
                          <br /><br />
                          <Textarea placeholder='Description' rows='10' cols='80' id='description' />
                          <Input placeholder='Initial Treasure (Dero Amount)' id='treasure' type='text' />
                          <p>Nominate a Judge. This person sorts through treasure claims and chooses who is entitled to the
                            funds. The judge is paid 10% of the treasure for this work. Backup judges can be nominated
                            later.</p>
                          <select id='judge' className='select select-bordered w-full max-w-xs'>
                            <option disabled selected>Self Nominate</option>
                            <option value='self'>Nominate this Island</option>
                            {judges}
                          </select>
                          <p>
                            Nominate an Executor. This person releases the treasure according to the judge's judgement,
                            or he may veto the decision if he believes it to be in error. He is not paid. Backup executors can be
                            nominated later.
                          </p>
                          <select id='executer' className='select select-bordered w-full max-w-xs'>
                            <option disabled selected>Executor</option>
                            <option value='self'>Nominate this Island</option>
                            {execs}
                          </select>
                        </div>
                        </> : ''}
                  <div className='pb-4'>
                    <Button size='sm' type={'submit'}>Create</Button>
                  </div>
                </FlexBoxColumn>
              </form>
              {error}
            </Card.Body>
          </Card>
        </div>}
    </FlexBoxRow>
  )
}
