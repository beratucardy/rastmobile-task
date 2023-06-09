import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo.svg";
import { settings } from "../../../../helpers/settings";
import {
  RiYoutubeFill,
  RiInstagramFill,
  RiBehanceFill,
  RiLinkedinFill,
} from "react-icons/ri";
import "./header.scss";
import Spacer from "../../../common/spacer/spacer";

const Header = () => {
  return (
    <Container className="header">
      <Spacer height={33.5} />
      <Navbar bg="white" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" title="Home">
            <img src={logo} alt={settings.siteName} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link
                href="https://rastmobile.com/iletisim/"
                target="_blank"
                title="Hakkımızda"
              >
                Hakkımızda
              </Nav.Link>
              <Nav.Link
                href="https://rastmobile.com/case-study/juri-yarisma-yazilimi/"
                target="_blank"
                title="Jüri - Yarışma Yazılımı"
              >
                Jüri - Yarışma Yazılımı
              </Nav.Link>
              <Nav.Link
                href="https://getwordninja.com/"
                target="_blank"
                title="Word Ninja"
              >
                Word Ninja
              </Nav.Link>
              <Nav.Link
                href="https://rastmobile.com/case-study/word-pyramids-kelime-bulmaca-oyunu/"
                target="_blank"
                title="Word Pyramids"
              >
                Word Pyramids
              </Nav.Link>
            </Nav>
            <div className="icons">
              <Nav.Link
                href="https://twitter.com/rastmobile"
                target="_blank"
                title="Rast Mobile Twitter"
              >
                <RiYoutubeFill />
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/mobilerast/"
                target="_blank"
                title="Rast Mobile Instagram"
              >
                <RiInstagramFill />
              </Nav.Link>
              <Nav.Link
                href="https://www.behance.net/rastmobile"
                target="_blank"
                title="Rast Mobile Behance"
              >
                <RiBehanceFill />
              </Nav.Link>
              <Nav.Link
                href="https://www.linkedin.com/company/rastmobile/"
                target="_blank"
                title="Rast Mobile LinkedIn"
              >
                <RiLinkedinFill />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
