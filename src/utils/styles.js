import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CenterBullets = styled.ul`
  margin: auto;
  padding: auto;
  text-align: left;
  list-style-position: inside;
  display: inline-block;
  font-size: 20px;
`;

export const Flip90Image = styled.img`
  max-width: 500px;
  max-height: 500px;
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 10px 10px 5px grey;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
`;

export const FlippedImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  box-shadow: -10px -10px 5px grey;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
`;

export const NonbulletList = styled.ul`
  list-style: none
  margin: 0
  padding: 0
`;

export const RoundedImage = styled.img`
  max-width: 400px;
  max-height: 400px;
  border-radius: 100%;
  border: 2px solid black;
  box-shadow: 10px 10px 5px grey;
  padding: 5px;
  border: 1px solid black;
  margin: 30px;
  background-color: DarkRed;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: white;
  &:hover {
    text-decoration: none;
    color: gold;
  }
`;

export const TableFormat = styled.table`
  text-align: left;
  border-collapse: collapse;
  margin: auto;
  font-family: 'Inconsolata', monospace;
  border-spacing: 0 1em;
  min-width: 1000px;
  background-color: rgb(16, 16, 16);
  tr {
    border-bottom: 2px solid white;
  }
  th {
    padding: 10px;
    background-color: rgb(30, 30, 30);
  }
  td {
    font-weight: bold;
    padding: 10px;
  }
`;

export const TextBlock = styled.p`
  text-align: left;
  display: inline-block;
  padding-left: 2.5%;
  padding-right: 2.5%;
`;

export const SourceBlock = styled.p`
  text-align: left;
  display: inline-block;
  padding-left: 2.5%;
  padding-right: 2.5%;
  font-size: 12px;
  color: DarkRed;
`;

export const StandardImage = styled.img`
  max-width: 250px;
  max-height: 250px;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  min-width: 600px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  line-height: 1.6;
`;

export const CustomFooter = styled.footer`
  margin: auto;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: black;
  color: white;
  border-top: 2px solid black;
  line-height: 1.6;
  font-weight: bold;
  min-width: 600px;
`;

export const CustomLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: gold;
  }
`;

export const CustomerHeader = styled.header`
  margin: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgb(139, 0, 0, 0.3);
  min-width: 600px;
`;

export const SiteTitle = styled.h1`
  color: gold;
  font-family: 'Inconsolata', monospace;
  font-size: 50px;
`;

export const CustomBadge = styled.img`
  max-width: 40px;
  max-height: 40px;
  padding: 0px;
  margin: 0px;
`;

export const CustomRow = styled.tr`
  &:nth-child(2) {
    background-color: rgb(212, 175, 55, 0.6);
  }
  &:nth-child(2):hover {
    background-color: rgb(212, 175, 55, 0.9);
  }
  &:nth-child(3) {
    background-color: rgb(192, 192, 192, 0.6);
  }
  &:nth-child(3):hover {
    background-color: rgb(192, 192, 192, 0.9);
  }
  &:nth-child(4) {
    background-color: rgb(205, 127, 50, 0.6);
  }
  &:nth-child(4):hover {
    background-color: rgb(205, 127, 50, 0.9);
  }
`;

export const Overflow = styled.div`
  overflow-x: hidden;
`;

export const CustomImg = styled.img`
  max-width: 180px;
  max-height: 180px;
`;

export const HomeImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
  padding: 0px;
  vertical-align: middle;
`;

export const IconImg = styled.img`
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;
  padding: 0px;
  vertical-align: middle;
  padding-bottom: 5px;
`;

export const CustomP = styled.p`
  font-size: 15px;
`;

export const CustomNav = styled.div`
  background-repeat: repeat;
  background-color: black;
  min-width: 600px;
`;

export const CustomReactLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: none;
    color: gold;
  }
`;

export const CustomIcon = styled.img`
  max-width: 50px;
  max-height: 50px;
  padding: 0px;
  filter: grayscale(50%);
  &:hover {
    filter: grayscale(0%);
  }
`;

export const ModalWrap = styled.div`
  margin: 0 auto;
  min-width: 600px;
  max-height: 600px;
  overflow-y: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: black;
  color: white;
  line-height: 1.6;
`;

export const CustomButton = styled.button`
  color: white;
  background-color: rgb(40, 40, 40);
  padding: 0.5em;
  &:hover {
    background-color: rgb(16, 16, 16);
    color: gold;
  }
`;

export const CustomRow2 = styled.tr`
  background-color: rgb(16, 16, 16);
  border-bottom: 2px solid white;
`;

export const CustomHeaderRow = styled.tr`
  border-bottom: 2px solid white;
`;

export const CustomRow3 = styled.tr`
  border: 2px solid white;
`;

export const GDIData = styled.td`
  background-color: rgb(16, 16, 16);
  min-width: 200px;
`;

export const NodData = styled.td`
  background-color: rgb(30, 30, 30);
  min-width: 200px;
`;

export const RandomData = styled.td`
  background-color: rgb(16, 16, 16);
  min-width: 200px;
`;

export const TotalData = styled.td`
  background-color: rgb(30, 30, 30);
  min-width: 200px;
`;

export const CustomCenterD = styled.div`
  text-align: center;
  padding: 2.5rem;
`;

export const CustomLeftP = styled.p`
  max-width: 1000px;
  text-align: left;
  margin: auto;
`;

export const CustomLink2 = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.8rem;
  background-color: rgba(64, 64, 64, 0.6);
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(64, 64, 64, 0.9);
    text-decoration: none;
    color: gold;
  }
`;

export const CustomImage = styled.img`
  max-width: 200px;
  max-height: 200px;
`;
