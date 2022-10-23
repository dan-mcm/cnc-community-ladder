import React from 'react';
import { Wrapper, CenterBullets, StyledLink } from '../utils/styles';

// OBS screenshots
import obs from '../images/streamers/obs-overlay.png';
import obszoom from '../images/streamers/obs-overlay-zoomed.png';
import obsbrowser from '../images/streamers/obs-browser.png';
import obslink from '../images/streamers/obs-link.png';

// Nightbot screenshots
import nightbot from '../images/streamers/nightbot.png';

function Streamers() {
  return (
    <Wrapper>
      <h2>Resources for Streamers</h2>
      <br />
      <hr />
      <div>
        <h3>Nightbot Setup</h3>
        <img alt="nightbot" src={nightbot} />
        <br />
        <p>To set this up follow these steps</p>
        <br />
        <CenterBullets>
          <li>
            In your nightbot dashboard create a new custom command with the
            following message
          </li>
          <br />
        </CenterBullets>
        <br />
        {
          // eslint-disable-next-line
          '$(eval a = `$(urlfetch https://www.tibdawn.com/nightbot/3/$(query))`; js = JSON.parse(a); `[S3+ TD Ladder] Player Name: ${js.name} | Rank: ${js.rank} | Wins: ${js.wins} | Losses: ${js.lost} | Points: ${(js.points)}`)'
        }
        <br />
        <br />
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              // eslint-disable-next-line
              '$(eval a = `$(urlfetch https://www.tibdawn.com/nightbot/3/$(query))`; js = JSON.parse(a); `[S3+ TD Ladder] Player Name: ${js.name} | Rank: ${js.rank} | Wins: ${js.wins} | Losses: ${js.lost} | Points: ${(js.points)}`)'
            );
          }}
        >
          Copy to Clipboard
        </button>
      </div>
      <br />
      <hr />
      <div>
        <h3>OBS Overlay Setup</h3>
        <img alt="obs" src={obs} />
        <br />
        <img alt="obszoom" src={obszoom} />
        <br />
        <p>To set this up follow these steps</p>
        <br />
        <CenterBullets>
          <li>
            Generate a link using this format:{' '}
            <StyledLink href="https://www.tibdawn.com/obs/3/Danku">
              https://www.tibdawn.com/obs/3/Danku
            </StyledLink>
          </li>
          <li>
            Replace the name with your in-game username - some examples might
            look like the following (you can also change the number to the
            relevant season)
          </li>
          <ul>
            <li>
              <StyledLink href="https://www.tibdawn.com/obs/3/AOD Gaming">
                https://www.tibdawn.com/obs/3/AOD Gaming
              </StyledLink>
            </li>
            <li>
              <StyledLink href="https://www.tibdawn.com/obs/3/KHANOMANCER">
                https://www.tibdawn.com/obs/3/KHANOMANCER
              </StyledLink>
            </li>
            <li>
              <StyledLink href="https://www.tibdawn.com/obs/3/Za_BlackTemplar">
                https://www.tibdawn.com/obs/3/Za_BlackTemplar
              </StyledLink>
            </li>
          </ul>
          <li>
            In OBS create a new browser source and use your customised link.
          </li>
        </CenterBullets>
        <br />
        <img alt="obsbrowser" src={obsbrowser} />
        <br />
        <img alt="obslink" src={obslink} />
      </div>
      <br />
    </Wrapper>
  );
}

export default Streamers;
