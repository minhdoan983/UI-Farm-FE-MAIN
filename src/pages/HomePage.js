import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import MainSlideSide from "../layouts/MainSlideSide/MainSlideSide";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import {
  fetchItemByGallery,
  fetchItemById,
} from "../features/item/itemSlice";
import MainGalleryDisplay from "../layouts/MainGalleryDisplay/MainGalleryDisplay";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemArray = useSelector((state) => {
    return state.item.itemArray;
  });
  useEffect(() => {
    dispatch(fetchItemByGallery("SẢN PHẨM MỚI"));
  }, []);
  const handleItemClick = (id) => {
    dispatch(fetchItemById(id));
    navigate(`/item/${id}`);
  };
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <MainSlideSide />
      <MainGalleryDisplay />
      <Stack
        direction="column"
        spacing={4}
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <Grid container direction="column" spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              color="#A0522D"
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              SẢN PHẨM MỚI
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={9}
            sx={{
              paddingRight: { xs: "40px", sm: "40px", md: "50px" },
            }}
          >
            <Grid container spacing={4}>
              {itemArray.map((e) => (
                <Grid item xs={12} sm={6} md={3} key={e._id}>
                  <Card
                    onClick={() => handleItemClick(e._id)}
                    sx={{
                      height: "600px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "0.3s ease",
                      "&:hover": {
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={e.name}
                      image={e.imgUrl[0]}
                      sx={{
                        height: { xs: "400px", sm: "400px", md: "450px" },
                        objectFit: "cover",
                        width: "100%",
                        transition: "0.3s ease",
                        "&:hover": {
                          transition: "3s",
                          height: "100%",
                          position: "absolute",
                          zIndex: 1,
                        },
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.name}
                      </Typography>
                      {e?.color?.map((option, index) => (
                        <Tag key={index}>{option}</Tag>
                      ))}
                    </CardContent>
                    <CardActions sx={{ padding: "16px" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {`Giá: ${e.price.toLocaleString("vi-VN")} đ`}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default HomePage;
