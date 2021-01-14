import styled from 'styled-components';

export const CenterBullets = styled.ul`
  margin: auto;
  padding: auto;
  text-align: left;
  list-style-position: inside;
  display: inline-block;
  font-size: 20px
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
  background-color: rgb(16,16,16);
  tr {
    border-bottom: 2px solid white;
  }
  th {
    padding: 10px;
    background-color: rgb(30,30,30);
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
