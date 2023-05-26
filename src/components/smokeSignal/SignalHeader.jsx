import React from "react";
import {FlexBoxRow} from "@/components/common/FlexBoxRow.jsx";
import {FlexBoxColumn} from "@/components/common/FlexBoxColumn.jsx";
import {Divider} from "react-daisyui";

export const SignalHeader = ({signal, deadline}) => {

  return (
    <>
      <FlexBoxRow justify='between' className='prose pb-2'>
        <img src={signal.image} className='h-48 rounded-2xl mx-2' />
        <FlexBoxColumn align='start'>
          <h2 className='text-primary-focus'>{signal.name}</h2>
          <h4>{signal.tagline}</h4>
          <h4>Goal: {signal.goal/100000} Dero by {deadline}</h4>
          <h4>Progress: {signal.raised/100000} / {signal.goal/100000}</h4>
          <h4>Funds go to:</h4>
          <p className='prose-sm'>{signal.fundee}</p>
          <Divider />
        </FlexBoxColumn>
      </FlexBoxRow>
    </>
  );
}
