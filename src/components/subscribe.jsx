import {useCallback, useEffect, useState} from 'react'
import {useSendTransaction} from '../useSendTransaction'
import {useGetSC} from '../useGetSC'
import {Button, Card} from 'react-daisyui';
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Input} from "@/components/common/Input.jsx";

export default function Subscribe(props) {
  const [sendTransaction] = useSendTransaction()
  const [availability, setAvailability] = useState("")
  const [subbed, setSubbed] = useState(false)
  const [expiry, setExpiry] = useState(null)
  const [integrated, setIntegrated] = useState(false)
  const [integratedAddress, setIntegratedAddress] = useState("")
  const [getSC] = useGetSC()

  const checkAvailability = useCallback(async () => {
    const res = await getSC(props.scid)
    const obj = res.stringkeys
    let search = props.profile + props.index + "_Av"
    let avail = obj[search]
    setAvailability(avail)
  })

  const getIntegrated = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/islands/integrate/${e.target.address.value}/${props.profile + props.index}`)
    const body = await response.json()
    console.log(body)
    setIntegratedAddress(body.address)

  }

  const checkSubbed = useCallback(async () => {
    const res0 = await getSC(props.scid)
    var scData = res0.stringkeys
    var supporterSearch = `${props.userAddress}_${props.profile + props.index}_E`
    var expiry = scData[supporterSearch]
    if (expiry) {
      if (expiry > new Date().getTime() / 1000) {
        setSubbed(true)
        setExpiry(Math.round((expiry - new Date().getTime() / 1000) / (60 * 60 * 24)))
      } else {
        setSubbed(true)
        setExpiry(0)
      }
    }
  })

  const [error, setError] = useState("")

  const topUp = useCallback(async (event) => {
    event.preventDefault();
    setError("");
    const TierHash = props.profile + props.index.toString()
    const SupporterHash = props.userAddress

    const data = new Object(
      {
        "scid": props.scid,
        "ringsize": 2,
        "transfers": [{
          "burn": (parseInt((event.target.amount.value) * 100000)),
          "destination": props.randomAddress
        }],
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "TU"
        },
          {
            "name": "T",
            "datatype": "S",
            "value": TierHash
          },
          {
            "name": "S",
            "datatype": "S",
            "value": SupporterHash
          }
        ]
      }
    )
    sendTransaction(data)
  })

  const subscribe = useCallback(async (event) => {
    event.preventDefault();
    setError("");
    const TierHash = props.profile + props.index.toString()
    const SupporterHash = props.userAddress

    const data = new Object(
      {
        "scid": props.scid,
        "ringsize": 2,
        "transfers": [{
          "burn": (parseInt((event.target.amount.value) * 100000)),
          "destination": props.randomAddress
        }],
        "sc_rpc": [{
          "name": "entrypoint",
          "datatype": "S",
          "value": "AS"
        },
          {
            "name": "T",
            "datatype": "S",
            "value": TierHash
          },
          {
            "name": "S",
            "datatype": "S",
            "value": SupporterHash
          }
        ]
      }
    )
    sendTransaction(data)
    setTimeout(() => {
      checkAvailability()
    }, 10000)

  })
  useEffect(() => {
    console.log("executed only once!");
    //checkAvailability();
    checkSubbed();
  }, []);

  return (
    <FlexBoxRow className='py-8'>
      <Card side='lg' bordered='true' image-full='false' className='bg-secondary shadow-md'>
        <Card.Body className=''>
          <h3 className='text-center'>{props.name}</h3>
          <FlexBoxColumn align='start'>
            <FlexBoxRow justify='center' align='start'>
              <div className="mb-4 font-bold w-1/4">Rate:</div>
              <div className='mb-4 flex-1'>{props.amount / 100000} Dero
                per {Math.round(props.interval / (60 * 60 * 24))} days
              </div>
            </FlexBoxRow>
            <FlexBoxRow justify='start' align='start'>
              <div className="mb-4 font-bold w-1/4">Available Spots:</div>
              <div className="mb-4 flex-1">{props.available}</div>
            </FlexBoxRow>
            <FlexBoxRow justify='start' align='start'>
              <div className="mb-4 font-bold w-1/4">Perks:</div>
              <div className="mb-4 flex-1">{props.perks}</div>
            </FlexBoxRow>
              {subbed ?
                <form onSubmit={topUp}>
                  {expiry === 0 ? <p>Your subscription has expired.</p> :
                    <p>You are subscribed to this tier. Your subscription ends in {expiry} days.</p>}
                  <FlexBoxRow>
                    <Input name='amount' placeholder="Dero Amount" id="amount" type="text" />&nbsp;
                    <Button size='md' type={"submit"}>Top Up</Button>
                  </FlexBoxRow>
                </form> :
                <form onSubmit={subscribe}>
                  <FlexBoxRow>
                    <Input name='amount' placeholder="Dero Amount" id="amount" type="text" />&nbsp;
                    <Button size='md' type={"submit"}>Subscribe</Button>
                  </FlexBoxRow>
                </form>}
              <div className="error"> {error}</div>
              {integrated ?
                <form onSubmit={getIntegrated}>
                  <FlexBoxRow>
                    <Input name='address' id="address" type="text" placeholder="Subscriber's Dero Address" />&nbsp;
                    <Button size='md' type={"submit"}>Get</Button>
                  </FlexBoxRow>
                </form> :
                <small onClick={() => setIntegrated(!integrated)}>Get Integrated Address</small>}
            {integratedAddress}
          </FlexBoxColumn>
        </Card.Body>
      </Card>
    </FlexBoxRow>
  )
}