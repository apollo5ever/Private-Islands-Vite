import {Helpers} from '@/utils/helpers.js';
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {Button, Card} from "react-daisyui";
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";

export default function FundCard(props) {

  return (
    <FlexBoxRow className='py-8 prose'>
      <Card side='lg' bordered='true' image-full='false' className='bg-secondary shadow-md'>
        <Card.Body className=''>
          <FlexBoxColumn>
            <h1>{props.name}</h1>
            <h3>Initiated by {props.profile}</h3>
            <img src={props.image} className='w-1/2 rounded-md' />
            <p>{props.tagline}</p>
            <p>Goal: {Helpers.formatNumber(props.goal)} Dero by {Helpers.formattedDate(props.deadline * 1000)} </p>
            <Button size='md'>Click to See More</Button>
          </FlexBoxColumn>
        </Card.Body>
      </Card>
    </FlexBoxRow>
  )
}