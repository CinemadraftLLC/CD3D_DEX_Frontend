import React from "react";
import styles from "../../styles/draft.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DraftItem from "./DraftComponent/DraftItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DraftSecData } from "../../public/data/data";
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";

const CustomDivider = styled(Divider)(({ theme }) => ({
  width: "0px",
  height: "61px",
  background: "transparent",
  border: "1px solid #435475",
}));

const DraftSec = () => {
  return (
    <div className={styles.draftSec}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          The stars align at CinemaDraft
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <i>“You are only ever as good to me as the money you make!”</i>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          – Micky, 21
        </Typography>

        <div className={styles.draftSecVideo}>
          <ReactPlayer
            url="https://youtu.be/8mwvUl28eQM"
            playIcon={<PlayCircleOutlineIcon />}
            height={472}
            width={850}
          />
        </div>

        <Grid className={styles.itemGrid} container spacing={2}>
          {DraftSecData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <div style={{ display: "flex", alignItems: "center", maxWidth:300,height:200 }}>
                <div style={{marginRight:"20px"}}>
                  <Typography variant="h5" gutterBottom component="h5">
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle" gutterBottom component="p">
                    {item.description}
                  </Typography>
                </div>
                {index !== 3 && <CustomDivider orientation="vertical" />}
              </div>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" className={styles.DraftitemButton}>
          Marketplace
        </Button>
      </Container>
    </div>
  );
};

export default DraftSec;
