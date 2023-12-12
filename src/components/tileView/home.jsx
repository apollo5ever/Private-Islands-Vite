import { useNavigate } from 'react-router-dom';
import { SeniorCoco } from '@/components/tileView/sidebarView/SeniorCoco.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { BubbleText } from '@/components/tileView/sidebarView/bubbleText.jsx';
import { useState } from 'react';
import { Helpers, piAssetType } from '@/utils/helpers.js';

export const Home = () => {
  const DEFAULT_MESSAGE =
    "I'm Senior Coco - Please hover on each of these buttons to learn more.";
  const navigate = useNavigate();
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const handleMouseEnter = (type) => () => {
    setMessage(Helpers.getSeniorCocoMessage('home', type));
  };

  const handleMouseLeave = () => {
    setMessage(DEFAULT_MESSAGE);
  };

  return (
    <>
      <div className="inner_body justify-top relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-[#FDFBEA] via-[#F0EBDD] to-[#E5D7B9]">
        <header className="relative grid w-full content-center items-center">
          {/*HEADER BANNER*/}
          <div className="title_container relative z-10 mb-7 grid h-screen w-full place-content-center items-center bg-[url('https://redwebdesigns.ca/private/img/islands-parallax1.png')] bg-cover bg-fixed bg-center bg-no-repeat">
            <div className="bg_layer1 z-10 h-screen w-screen place-content-center bg-[url('https://redwebdesigns.ca/private/img/islands-parallax2.png')] bg-cover bg-center bg-no-repeat">
              <div className="bg_layer2 z-10 inline-block h-full w-full place-content-center bg-[url('https://redwebdesigns.ca/private/img/islands-parallax3.png')] bg-contain bg-center bg-no-repeat">
                <div className="bg_layer3 z-40 inline-block h-full w-screen bg-[url('https://redwebdesigns.ca/private/img/islands-parallax4.png')] bg-auto bg-fixed bg-bottom bg-no-repeat">
                  <div className="banner_text grid h-full w-full place-content-center items-center justify-items-stretch space-y-8 px-4">
                    <div className="site_title lg:text-10xl text-center font-fell text-6xl text-[#484541] drop-shadow-lg sm:text-8xl">
                      <a
                        className="inline-block drop-shadow-lg"
                        href="#"
                        aria-current="page"
                      >
                        Private Islands
                      </a>
                    </div>
                    <div className="tagline text-center text-3xl text-[#484541] drop-shadow-lg">
                      The world's most resilient support network
                    </div>
                    <div className="buttons mb-6 grid justify-items-center gap-5 sm:grid-cols-2">
                      <div
                        className="w-full max-w-sm cursor-pointer rounded-xl bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center font-fell text-3xl italic leading-tight text-[#FFF] hover:shadow-lg"
                        onClick={() => navigate('/pi/tiles')}
                      >
                        Explore
                      </div>

                      <div
                        className="w-full max-w-sm cursor-pointer rounded-xl bg-gradient-to-b from-[#61C0A8] to-[#6CCAB1] py-1 text-center font-fell text-3xl italic leading-tight text-[#FFF] hover:shadow-lg"
                        onClick={() => navigate('/pi/claimisland')}
                      >
                        Create Your Island
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="main_container relative mx-5 mb-12 mt-0 grid grid-cols-1 items-start">
          <div className="main_info relative mx-auto mt-8 w-full">
            <div className="intro_section mx-auto w-full pb-12">
              <div className="relative w-full">
                <div className="intro_text mx-auto w-full max-w-7xl space-y-5 text-center">
                  <h2 className="font-fell text-3xl leading-10 text-[#484541]">
                    We are building the world's most resilient support network
                  </h2>
                  <p className="font-['Average Sans'] text-lg leading-10 text-slate-800">
                    Private Islands is place where people can come together to
                    support projects without fear that their funds will be
                    seized or their networks wiped. Here on Private Islands,
                    creator-supporter relationships are stored on the Dero
                    blockchain. Funds are either sent directly to their
                    recipient, or in some cases they are held in a smart
                    contract for a period of time.
                  </p>
                </div>
              </div>
            </div>
            <FlexBoxRow>
              <div className="second_section mx-auto grid w-full pb-12 sm:grid-cols-2">
                {/*HOW TO START CARD - RIGHT COLUMN*/}
                <div className="how_to_start mx-auto inline-block w-full rounded-lg bg-[white] px-4 pb-6 pt-4 shadow-xl ring-1 ring-gray-900/5">
                  <div className="mx-auto grid w-full grid-cols-1 content-start">
                    <div className="how_to_start_1-2 relative">
                      <h3 className="w-full py-1 text-left text-slate-500">
                        <span className="text-3xl text-[#61C0A8]">
                          How Do I Start?
                        </span>
                      </h3>
                      <p className="mt-2 text-lg text-slate-500">
                        In order to use this website you need two things:
                      </p>
                      <div className="my-4 grid grid-cols-10 content-center items-center justify-start justify-items-start gap-2">
                        <div className="col-span-1 text-2xl font-bold">1.</div>
                        <div className="col-span-9">
                          A DERO wallet running with the rpc-server turned on.
                        </div>
                        <div className="col-span-1 text-2xl font-bold">2.</div>
                        <div className="col-span-9">
                          The Dero RPC Bridge Extension
                        </div>
                      </div>
                    </div>
                    <div className="rpc_info mb-3 w-full rounded-lg bg-slate-100 px-2 py-2 shadow-lg ring-1 ring-slate-300 sm:max-w-xs">
                      <p className="text-slate-500">Get the RPC extension:</p>
                      <div className="buttons grid grid-cols-2 justify-items-center gap-4">
                        <a
                          href="https://chromewebstore.google.com/detail/dero-rpc-bridge/nmofcfcaegdplgbjnadipebgfbodplpd"
                          target="_blank"
                          className="w-full cursor-pointer py-1 text-left font-fell text-lg italic leading-tight text-[#61C0A8] underline"
                        >
                          (Chrome store)
                        </a>
                        <a
                          href="https://addons.mozilla.org/en-US/firefox/addon/dero-rpc-bridge/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search"
                          target="_blank"
                          className="w-full cursor-pointer py-1 text-left font-fell italic leading-tight text-[#61C0A8] underline"
                        >
                          (Firefox)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navigation_container relative mx-6 mt-0 w-full gap-6 sm:grid-cols-2">
                  <div className="main_navigation relative mb-[50px] grid grid-cols-4 place-content-between gap-6 sm:col-span-2 lg:col-span-3">
                    <div className="navbar col-span-3 ml-12 lg:col-span-2">
                      <FlexBoxRow>
                        <FlexBoxColumn
                          align="start"
                          gap={2}
                          className="flex-grow"
                        >
                          <div
                            className="cursor-pointer rounded-xl border-2 bg-[#61C0A8] px-4 py-1 text-center text-white hover:bg-[#5DA399]"
                            onMouseEnter={handleMouseEnter(
                              piAssetType.FUNDRAISER
                            )}
                            onMouseLeave={handleMouseLeave}
                          >
                            Fundraisers
                          </div>
                          <div
                            className="cursor-pointer rounded-xl border-2 bg-[#61C0A8] px-4 py-1 text-center text-white"
                            onMouseEnter={handleMouseEnter(piAssetType.BOUNTY)}
                            onMouseLeave={handleMouseLeave}
                          >
                            Bounties
                          </div>
                          <div
                            className="cursor-pointer rounded-xl border-2 bg-[#61C0A8] px-4 py-1 text-center text-white"
                            onMouseEnter={handleMouseEnter(
                              piAssetType.SUBSCRIPTION
                            )}
                            onMouseLeave={handleMouseLeave}
                          >
                            Subscriptions
                          </div>
                        </FlexBoxColumn>
                        <FlexBoxRow>
                          <div className="flex flex-col items-end justify-start">
                            <div className="h-24 w-full">
                              {' '}
                              {/* Reserve space for BubbleText */}
                              <BubbleText text={message} />
                            </div>
                            <div className="mt-4 flex-shrink-0">
                              <SeniorCoco />
                            </div>
                          </div>
                        </FlexBoxRow>
                      </FlexBoxRow>
                    </div>
                  </div>
                </div>
              </div>
            </FlexBoxRow>
          </div>
        </div>
      </div>
    </>
  );
};
