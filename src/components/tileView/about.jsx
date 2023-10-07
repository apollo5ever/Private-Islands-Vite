import React from 'react';
import bgImage from '@/assets/parallax/LeftIsland.png';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';

export const About = () => {
  return (
    <FlexBoxColumn className="relative mx-auto mt-4 max-w-3xl rounded-lg border border-secondary p-8 font-fell text-black">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: 0.6,
          position: 'absolute',
          top: '0',
          right: '60%',
          width: '100%',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          zIndex: 2,
        }}
      ></div>
      <h1 className="mb-6 text-4xl font-bold">Welcome to Private Islands</h1>

      <section className="z-10 mb-6">
        <h2 className="text-3xl">What We Offer</h2>
        <p className="z-10 mt-2 text-2xl">
          Private Islands is gradually becoming the world's most resilient
          financial support network. All data is stored in a decentralized,
          censorship-resistant manner. Flow of funds is directed by smart
          contract, making it transparent and trustless. The currency of choice
          here is Dero, meaning once the money is raised, subsequent
          transactions are private. We offer three different models of financial
          support.
        </p>
      </section>

      <section className="z-10 mb-6">
        <h3 className="text-3xl">Buried Treasure Bounties</h3>
        <p className="z-10 mt-2 text-2xl">
          When there is a task you'd like to see completed, create a Buried
          Treasure Bounty. Dero is stored in the smart contract until someone
          completes the task. Once created, anyone can add Dero to the bounty.
          The judge decides who has earned the treasure. It can be multiple
          people. The executer approves or vetos the judge's decision. If nobody
          is chosen to receive the treasure before the expiration date, donors
          can retrieve their funds.
        </p>
      </section>

      <section className="z-10 mb-6">
        <h3 className="text-3xl">Smoke Signal Fundraisers</h3>
        <p className="z-10 mt-2 text-2xl">
          When you need to raise money for your cause, use a Smoke Signal
          Fundraiser. Set a goal, and a deadline. Users donate dero, which is
          then stored in the contract. If the goal is met, dero is sent to the
          fundee. If the deadline is past and the goal is not met, users are
          refunded.{' '}
          <a
            href="https://odysee.com/@apollo5ever:1/private-islands-ssf-demo:3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Video
          </a>
        </p>
      </section>

      <section className="z-10 mb-6">
        <h3 className="text-3xl">Message-in-a-Bottle Subscriptions</h3>
        <p className="z-10 mt-2 text-2xl">
          If you have something to offer on a subscription-basis, create a
          Message-in-a-Bottle subscription tier. Specify an amount and an
          interval. For example, 10 Dero per month for access to a newsletter.
          When you create content for your subscribers, it is encrypted and
          stored with filecoin and ipfs. Subscribers receive cid and decryption
          key via dero transaction.{' '}
          <a
            href="https://odysee.com/@apollo5ever:1/private-islands-mib-demo:4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Video
          </a>
        </p>
      </section>

      <section className="z-10 mb-6">
        <h3 className="text-3xl">Our Mission</h3>
        <p className="z-10 mt-2 text-2xl">
          We are building the world's most resilient support network. A place
          where people can come together to support projects without fear that
          their funds will be seized or their networks wiped. Here on Private
          Islands, creator-supporter relationships are stored on the Dero
          blockchain. Funds are either sent directly to their recipient, or in
          some cases they are held in a smart contract for a period of time.
        </p>
      </section>

      <section className="z-10 mb-6">
        <h3 className="text-3xl">How Do I Start?</h3>
        <p className="z-10 mt-2 text-2xl">
          In order to use this website you need two things:
          <ol className="mt-2 list-decimal pl-5">
            <li>A Dero wallet running with the rpc-server turned on.</li>
            <li>
              The Dero RPC Bridge Extension{' '}
              <a
                href="https://chrome.google.com/webstore/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                (chrome store)
              </a>{' '}
              <a
                href="https://addons.mozilla.org/en-CA/firefox/addon/dero-rpc-bridge/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                (firefox)
              </a>
            </li>
          </ol>
        </p>
      </section>
    </FlexBoxColumn>
  );
};
