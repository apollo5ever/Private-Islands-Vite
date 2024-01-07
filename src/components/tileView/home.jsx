import mapPathDown from '/src/assets/images/homePage/dashedPathDown.svg';
import mapPathRight from '/src/assets/images/homePage/dashedPathRight.svg';
import parallax_bg from '/src/assets/images/homePage/islands-parallax-bg.png';
import parallax1 from '/src/assets/images/homePage/islands-parallax-1.png';
import parallax2 from '/src/assets/images/homePage/islands-parallax-2.png';
import parallax3 from '/src/assets/images/homePage/islands-parallax-3.png';
import parallax4 from '/src/assets/images/homePage/islands-parallax-4.png';
import parallax5 from '/src/assets/images/homePage/islands-parallax-5.png';
import parallax6 from '/src/assets/images/homePage/islands-parallax-6.png';
import parallax7 from '/src/assets/images/homePage/islands-parallax-7.png';
import parallax8 from '/src/assets/images/homePage/islands-parallax-8.png';
import parallax9 from '/src/assets/images/homePage/islands-parallax-9.png';
import treasureChest from '/src/assets/icons/icon_locked-chest_tan.svg';
import litFlame from '/src/assets/icons/icon_fire_orange.svg';
import bottle from '/src/assets/icons/icon_bottle_blue.svg';
import { PageHeader } from '@/components/tileView/header/PageHeader.jsx';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div className="inner_body justify-top relative flex min-h-screen flex-col bg-gradient-to-b from-[#FDFBEA] via-[#F0EBDD] to-[#E5D7B9]">
        <div className="home_hero relative grid w-full content-center items-center">
          <div
            className="title_container grid h-screen w-full place-content-center items-center bg-cover bg-fixed bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${parallax_bg})` }}
          >
            <div
              className="bg_layer1 inline-block h-screen w-screen bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${parallax1})` }}
            >
              <div
                className="bg_layer2 inline-block h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${parallax2})` }}
              >
                <div
                  className="bg_layer3 inline-block h-screen w-screen bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${parallax3})` }}
                >
                  <div
                    className="bg_layer4 inline-block h-screen w-screen bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${parallax4})` }}
                  >
                    <div
                      className="bg_layer5 inline-block h-screen w-screen bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${parallax5})` }}
                    >
                      <div
                        className="bg_layer6 bg-homepage-fade inline-block h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${parallax6})` }}
                      >
                        <div
                          className="bg_layer7 relative z-20 inline-block h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${parallax7})` }}
                        >
                          <div
                            className="bg_layer8 relative z-20 inline-block h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${parallax8})` }}
                          >
                            <div
                              className="bg_layer9 relative z-20 inline-block h-screen w-screen bg-cover bg-fixed bg-bottom bg-no-repeat"
                              style={{ backgroundImage: `url(${parallax9})` }}
                            >
                              <div className="banner_text sticky left-0 right-0 top-1/3 z-50 grid w-full place-content-center place-items-center items-center justify-items-stretch space-y-8 place-self-center px-4 pb-5">
                                <h1 className="site_title lg:text-10xl text-center text-6xl text-black sm:text-8xl">
                                  Private Islands
                                </h1>

                                <div className="tagline text-center text-3xl font-semibold drop-shadow-[0_3px_5px_rgba(255,255,255,0.8)]">
                                  The World's Most Resilient Support Network
                                </div>

                                <div className="buttons mb-6 grid justify-items-center gap-5 sm:grid-cols-2">
                                  <NavLink
                                    className="btn w-full max-w-sm cursor-pointer rounded-xl bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-3xl italic leading-tight text-white hover:shadow-lg"
                                    to="/pi/archipelago"
                                    onClick={() => setSelectedTile(null)}
                                  >
                                    Explore
                                  </NavLink>

                                  <NavLink
                                    to="/pi/claimisland"
                                    className="btn w-full max-w-sm cursor-pointer rounded-xl bg-gradient-to-b from-accent to-[#6CCAB1] py-1 text-center text-3xl italic leading-tight text-white hover:shadow-lg"
                                  >
                                    Claim Your Island
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PageHeader />

        <div className="main_container relative mx-5 grid grid-cols-1 items-start py-6">
          <div className="main_info relative mx-auto w-full">
            <div className="intro_section mx-auto w-full px-1 py-6 sm:px-6 lg:w-3/4">
              <div className="relative w-full">
                <div className="intro_text mx-auto w-full max-w-7xl space-y-5 text-center">
                  <h2 className="text-3xl leading-10">
                    Private Islands is place where people can come together to
                    support projects without fear that their funds will be
                    seized or their networks wiped.
                  </h2>
                  <p className="text-xl leading-10">
                    <span className="italic">
                      Creator &#10094;&#9903;&#10095; Supporter
                    </span>{' '}
                    relationships are stored on the Dero blockchain. Funds are
                    either sent directly to their recipient, or in some cases
                    they are held in a smart contract for a period of time.
                  </p>
                </div>
              </div>
            </div>

            <div className="clear-both h-4 sm:h-8"></div>

            <div className="pi_sections_content flex w-full justify-center space-y-6 px-2">
              <div className="funding_type grid w-full items-stretch gap-6 text-lg italic leading-6 sm:text-xl md:grid-cols-3 lg:gap-10">
                {/*TODO link to new fundraiser page??*/}
                <div className="grid cursor-pointer items-center space-y-3 rounded-lg bg-[rgba(255,255,255,0.6)] p-6 text-center shadow-lg ring-1 ring-[#E5D7B9] hover:scale-105 hover:bg-[rgba(255,255,255,0.9)]">
                  <h4 className="text-3xl text-[#F89070]">Smoke Signals</h4>
                  <div className="clear-both"></div>
                  <div>
                    <img src={litFlame} className="mx-auto w-full max-w-fit" />
                  </div>
                  <div className="clear-both"></div>
                  <div className="text-3xl font-black text-[#F89070]">
                    Fundraisers
                  </div>
                </div>
                {/*TODO link to new subscription page??*/}
                <div className="grid cursor-pointer items-center space-y-3 rounded-lg bg-[rgba(255,255,255,0.6)] p-6 text-center shadow-lg ring-1 ring-[#E5D7B9] hover:scale-105 hover:bg-[rgba(255,255,255,0.9)]">
                  <h4 className="text-3xl text-[#46BDDC]">
                    Message in a Bottle
                  </h4>
                  <div className="clear-both"></div>
                  <div>
                    <img src={bottle} className="mx-auto w-full max-w-fit" />
                  </div>
                  <div className="clear-both"></div>
                  <div className="text-3xl font-black text-[#46BDDC]">
                    Subscriptions
                  </div>
                </div>
                {/*TODO link to new bounties page??*/}
                <div className="grid cursor-pointer items-center space-y-3 rounded-lg bg-[rgba(255,255,255,0.6)] p-6 text-center shadow-lg ring-1 ring-[#E5D7B9] hover:scale-105 hover:bg-[rgba(255,255,255,0.9)]">
                  <h4 className="text-3xl text-[#90663E]">Treasure Chest</h4>
                  <div className="clear-both"></div>
                  <div>
                    <img
                      src={treasureChest}
                      className="mx-auto w-full max-w-fit"
                    />
                  </div>
                  <div className="clear-both"></div>
                  <div className="text-3xl font-black text-[#90663E]">
                    Bounties
                  </div>
                </div>
              </div>
            </div>

            <div className="clear-both h-8 md:h-12"></div>

            <div className="island_section mx-auto my-8 grid w-full rounded-lg border-[2px] border-dashed border-[#90663E] bg-[url('https://redwebdesigns.ca/private/img/islands-parallax-bg.png')] bg-cover bg-fixed bg-center bg-no-repeat px-6 py-10 sm:grid-cols-2 sm:gap-8 lg:gap-1">
              <div className="island_tile relative z-20 mx-auto grid w-full max-w-md rounded-lg bg-[white] px-4 pb-4 pt-4 shadow-xl ring-1 ring-gray-100 md:max-w-lg">
                <div className="mx-auto grid w-full content-start">
                  <div className="island_card relative z-20 mx-auto flex w-full rounded-lg bg-[#FBF8EC] px-4 pb-6 pt-4 shadow-xl ring-1 ring-[#E5D7B9] hover:bg-gray-100 sm:px-3">
                    <div className="mx-auto grid w-full grid-cols-1 content-stretch">
                      <div className="flex min-w-full pb-10">
                        <div className="w-full items-end space-y-3 text-center">
                          <h2 className="text-3xl leading-10 text-accent md:text-4xl">
                            Mint Your Private Island!
                          </h2>
                        </div>
                      </div>
                      <div className="img_container relative mx-auto w-full text-center">
                        <div
                          className="main_card_img_bg h-0 w-full rounded-lg pt-[100%] before:absolute before:-inset-1 before:block before:bg-[rgba(144,102,62,0.4)]"
                          style={{
                            clipPath:
                              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          }}
                        ></div>
                        <div
                          className="main_card_img absolute -top-[10px] left-0 inline-block h-0 w-full rounded-lg bg-[url('https://privateislands.fund/assets/images/islandPlaceholder_3.png')] bg-cover bg-center bg-no-repeat pt-[100%]"
                          style={{
                            clipPath:
                              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="z-20 w-[250px] sm:hidden"
                  style={{
                    transform: 'rotate(-45deg) matrix(-1, 0, 0, -1, 0, 0)',
                  }}
                >
                  <div className="curly_arrow down left-1/5 absolute -bottom-20">
                    <img src={mapPathDown} alt="Mint your Private Island" />
                  </div>
                </div>
                <div
                  className="curly_arrow absolute -right-16 top-1/4 z-20 hidden sm:inline-block md:-right-24 md:max-w-[500px] lg:-right-96"
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                >
                  <div>
                    <img src={mapPathRight} alt="Mint your Private Island" />
                  </div>
                </div>
              </div>
              <div className="clear-both h-20 sm:hidden"></div>
              <div className="xspotbtn grid w-full max-w-md cursor-pointer space-y-3 place-self-center rounded-lg bg-[#FBF8EC] pb-3 text-center shadow-lg ring-1 ring-[#E5D7B9] hover:scale-105 hover:ring-accent">
                <NavLink to="/pi/claimisland">
                  <div className="text-9xl text-accent">&#10008;</div>
                  <h4 className="text-2xl text-accent">Click Here</h4>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
