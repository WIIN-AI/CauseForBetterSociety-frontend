import { Box, Container, Divider, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Drawer from "./drawer";
import CommentSection from "./commentSection";
import Dialog from "./Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router";

const PostDetails = () => {
  const { id } = useParams("");
  const myRef = useRef(null);
  const path = window.location.pathname;
  console.log(path);
  const [inputText] = useState("");

  const [paragraphs, setParagraphs] = useState([]);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const moreOpen = Boolean(anchorEl);

  useEffect(() => {
    const splitParagraphs = inputText.split("\n\n");
    // Apply optional formatting
    const formattedParagraphs = splitParagraphs.map((paragraph) => {
      // Add line breaks after each sentence
      paragraph = paragraph.replace(/\. /g, ".\n");
      // Indent first line
      paragraph = paragraph.replace(/\n/g, "\n  ");
      return paragraph;
    });
    setParagraphs(formattedParagraphs);
  }, [inputText]);

  const login = false;

  const getLike = function () {
    if (login) {
      setLike((e) => !e);
    } else {
      setOpen(true);
    }
  };

  const getComments = function () {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getSave = function () {
    if (login) {
      setSave((e) => !e);
    } else {
      setOpen(true);
    }
  };

  const shareLink = function () {
    setOpenShareLink(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="md">
      <Box mt={8} mb={8}>
        <Box>
          <p className="heading font-700">Post Heading</p>
          <br />
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">Sharan Murthi</p>
            <p style={{ opacity: "70%" }}>Published in Oct 17</p>
          </Box>
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">
              Issue :{" "}
              <span className="font-500 uppercase" style={{ color: "red" }}>
                pending
              </span>
            </p>
            <p>Telanagana, Karimnagar</p>
          </Box>
          <br />
          <Box
            className="flex center"
            height={40}
            padding={1}
            position="relative"
            border={"1px solid #e2e2e2"}
            boxSizing={"border-box"}
            justifyContent={"space-between"}
            pt={1}
            sx={{
              borderStyle: "solid hidden",
            }}
          >
            {like ? (
              <FavoriteIcon onClick={getLike} />
            ) : (
              <FavoriteBorderIcon onClick={getLike} />
            )}
            <ChatBubbleOutlineIcon onClick={getComments} />
            <ShareIcon onClick={shareLink} />
            {save ? (
              <BookmarkIcon onClick={getSave} />
            ) : (
              <BookmarkBorderIcon onClick={getSave} />
            )}
            <MoreHorizIcon onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={moreOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Request to complete</MenuItem>
              <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
          </Box>
          <br />
          <img
            width={"100%"}
            src="https://i.pinimg.com/originals/cf/e8/5e/cfe85ed3a39d1bcb65b5da5c4f75b363.jpg"
            alt=""
            style={{
              marginBottom: "20px",
            }}
          />
          <br />
          {paragraphs.map((paragraph) => (
            <p className="font-400 text-left text-justified" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <p className="medium font-400 text-left text-justified">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus
            sed viverra tellus in hac habitasse platea. Turpis egestas maecenas
            pharetra convallis posuere morbi leo. Sit amet nulla facilisi morbi
            tempus iaculis urna id volutpat. Netus et malesuada fames ac turpis
            egestas sed tempus. Sit amet mauris commodo quis imperdiet massa
            tincidunt. Mi quis hendrerit dolor magna eget. Egestas egestas
            fringilla phasellus faucibus. Faucibus et molestie ac feugiat sed
            lectus. Dictum fusce ut placerat orci nulla pellentesque. Mus mauris
            vitae ultricies leo integer malesuada nunc vel. Tellus elementum
            sagittis vitae et. At tempor commodo ullamcorper a. Auctor eu augue
            ut lectus. Cum sociis natoque penatibus et. Sollicitudin ac orci
            phasellus egestas tellus rutrum tellus pellentesque. Molestie a
            iaculis at erat pellentesque adipiscing. Orci phasellus egestas
            tellus rutrum tellus. Ultrices in iaculis nunc sed augue lacus
            viverra. Sem integer vitae justo eget magna fermentum iaculis eu
            non. Leo vel fringilla est ullamcorper eget. Iaculis eu non diam
            phasellus vestibulum lorem sed risus. Pretium lectus quam id leo in
            vitae turpis. Ut porttitor leo a diam sollicitudin. Fames ac turpis
            egestas integer eget aliquet nibh praesent tristique. Sed risus
            ultricies tristique nulla aliquet enim tortor at auctor. Quis
            eleifend quam adipiscing vitae. Odio eu feugiat pretium nibh ipsum
            consequat nisl vel pretium. Vestibulum mattis ullamcorper velit sed
            ullamcorper morbi tincidunt. Nec feugiat in fermentum posuere urna.
            Mi quis hendrerit dolor magna eget est lorem. Ac turpis egestas
            integer eget aliquet nibh praesent. Ut tortor pretium viverra
            suspendisse potenti nullam. Justo eget magna fermentum iaculis.
            Curabitur gravida arcu ac tortor dignissim convallis. Porta nibh
            venenatis cras sed felis eget velit aliquet sagittis. Sed id semper
            risus in hendrerit. Malesuada nunc vel risus commodo viverra. Mattis
            ullamcorper velit sed ullamcorper morbi. Hac habitasse platea
            dictumst quisque. Quisque non tellus orci ac auctor augue mauris.
            Tristique et egestas quis ipsum. Eleifend donec pretium vulputate
            sapien nec sagittis aliquam malesuada. Fames ac turpis egestas
            integer eget aliquet. Amet venenatis urna cursus eget nunc
            scelerisque viverra mauris in. Quis varius quam quisque id diam vel
            quam elementum pulvinar. Varius vel pharetra vel turpis nunc eget
            lorem dolor. Eget aliquet nibh praesent tristique magna sit amet.
            Aliquet enim tortor at auctor urna nunc id. At ultrices mi tempus
            imperdiet nulla malesuada pellentesque elit eget. Mattis
            pellentesque id nibh tortor id. Turpis egestas pretium aenean
            pharetra magna ac. Mi sit amet mauris commodo. Tortor dignissim
            convallis aenean et tortor at risus. Justo eget magna fermentum
            iaculis eu non diam. Odio aenean sed adipiscing diam donec
            adipiscing tristique risus. Suspendisse ultrices gravida dictum
            fusce ut. Suspendisse in est ante in. Metus vulputate eu scelerisque
            felis imperdiet proin fermentum. In tellus integer feugiat
            scelerisque varius morbi enim nunc faucibus. In hendrerit gravida
            rutrum quisque non tellus. Eget magna fermentum iaculis eu non diam.
            Venenatis a condimentum vitae sapien pellentesque. Porttitor rhoncus
            dolor purus non enim praesent elementum facilisis.
          </p>
        </Box>
      </Box>
      <Divider ref={myRef} style={{ marginBottom: "50px" }} />
      <Drawer open={open} setOpen={setOpen} />
      <CommentSection />
      <Dialog setOpenShareLink={setOpenShareLink} openShareLink={openShareLink}>
        {window.location.href}
      </Dialog>
    </Container>
  );
};

export default PostDetails;
