import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MainSidebar from "../layouts/MainSidebar/MainSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems, fetchItemById } from "../features/item/itemSlice";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { ConfigProvider, Pagination, Tag } from "antd";

function ItemPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemArray = useSelector((state) => {
    return state.item.itemArray;
  });
  const total = useSelector((state) => state.item.total);
  const handleItemClick = (id) => {
    dispatch(fetchItemById(id));
    navigate(`/item/${id}`);
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllItems(currentPage));
  // }, [currentPage]);
  return (
    <Stack direction="row" pl="20px" pr="20px" pt="80px">
      <MainSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Box sx={{ flexGrow: 1 }} pl={{ xs: 0, md: "200px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {itemArray.map((e) => (
            <Grid size={{ xs: 4, sm: 4, md: 3 }} key={e._id}>
              <Card
                onClick={() => handleItemClick(e._id)}
                sx={{
                  height: "500px",
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
                    height: { xs: "400px", sm: "400px", md: "350px" },
                    objectFit: "cover",
                    width: "100%",
                    transition: "0.3s ease",
                    "&:hover": {
                      transition: "3s",
                      height: "100%",
                      position: "absolute",
                      zIndex: 999,
                    },
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {e.name}
                  </Typography>
                  {e?.color?.map((option, index) => (
                    <Tag key={index}>{option}</Tag>
                  ))}
                </CardContent>
                <CardActions sx={{ padding: "10px" }}>
                  <Typography variant="body1">
                    {`Giá: ${e.price.toLocaleString("vi-VN")} đ`}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={(page) => setCurrentPage(page)}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default ItemPage;
