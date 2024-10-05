import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  fetchAllItems,
  fetchItemById,
  updateItem,
  deleteItem,
} from "../../features/item/itemSlice";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Grid,
  IconButton,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getAllMaterial } from "../../features/material/materialSlice";
import {
  fetchAllGalleries,
  createGallery,
  deleteGallery,
  addItemToGallery,
} from "../../features/gallery/gallerySlice";
import { cloudinaryUpload } from "../../utils/cloudinary";

function EditItemPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.itemArray);
  const selectedItem = useSelector((state) => state.item.item);
  const material = useSelector((state) => state.material.materialList);
  const galleries = useSelector((state) => state.gallery.galleries);

  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [action, setAction] = useState("create");
  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    color: "",
    material: "",
    imgUrl: [],
  });
  const [newImage, setNewImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [galleryData, setGalleryData] = useState({ name: "" });
  const [selectedGalleryId, setSelectedGalleryId] = useState("");

  useEffect(() => {
    dispatch(fetchAllItems());
    dispatch(getAllMaterial());
    dispatch(fetchAllGalleries()); 
  }, [dispatch]);

  useEffect(() => {
    if (selectedItemId && action === "edit") {
      dispatch(fetchItemById(selectedItemId));
    }
  }, [selectedItemId, dispatch, action]);

  useEffect(() => {
    if (selectedItem && action === "edit") {
      setItemData({
        name: selectedItem.name,
        price: selectedItem.price,
        color: selectedItem.color,
        material: selectedItem.material,
        imgUrl: selectedItem.imgUrl || [],
      });
      if (selectedItem.material && selectedItem.material.length > 0) {
        setSelectedMaterial(selectedItem.material[0]._id);
      }
    }
  }, [selectedItem, action]);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleAddImage = async () => {
    if (newImage) {
      const imageUrl = await cloudinaryUpload(newImage);
      setItemData({
        ...itemData,
        imgUrl: [...itemData.imgUrl, imageUrl],
      });
      setNewImage(null);
    }
  };

  const handleDeleteImage = (image) => {
    setItemData({
      ...itemData,
      imgUrl: itemData.imgUrl.filter((img) => img !== image),
    });
  };

  const handleUpdateItem = () => {
    dispatch(updateItem({ id: selectedItemId, ...itemData }));
    setSnackbarMessage("Item updated successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleCreateItem = () => {
    dispatch(createItem(itemData));
    setSnackbarMessage("Item created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem(selectedItemId));
    setSnackbarMessage("Item deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleCreateGallery = () => {
    if (galleryData.name.trim() === "") {
      setSnackbarMessage("Gallery name cannot be empty");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    dispatch(createGallery(galleryData));
    setGalleryData({ name: "" });
  };

  const handleDeleteGallery = () => {
    if (!selectedGalleryId) {
      setSnackbarMessage("Please select a gallery to delete");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    dispatch(deleteGallery(selectedGalleryId));
    setSelectedGalleryId("");
  };

  const handleAddItemToGallery = () => {
    if (!selectedGalleryId || !selectedItemId) {
      setSnackbarMessage("Please select both gallery and item");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    dispatch(addItemToGallery({ galleryId: selectedGalleryId, itemId: selectedItemId }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: "80px" }}>
      <Typography variant="h4" mb={3}>
        {action === "create"
          ? "Create New Item"
          : action === "edit"
          ? "Edit Item"
          : "Delete Item"}
      </Typography>

      <TextField
        select
        label="Select Action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        fullWidth
        sx={{ marginBottom: 3 }}
      >
        <MenuItem value="create">Create New Item</MenuItem>
        <MenuItem value="edit">Edit Item</MenuItem>
        <MenuItem value="delete">Delete Item</MenuItem>
      </TextField>

      {(action === "edit" || action === "delete") && (
        <TextField
          select
          label="Select Item"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
        >
          {items?.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {(action === "create" || action === "edit") && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={itemData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={itemData.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Color"
              name="color"
              value={itemData.color}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select Material"
              value={selectedMaterial}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedMaterial(selectedValue);
                setItemData({ ...itemData, material: selectedValue });
              }}
              fullWidth
            >
              {material?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              Item Images
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
              {itemData.imgUrl.map((image, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Item Image ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDeleteImage(image)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
              </Button>

              <Button variant="contained" onClick={handleAddImage}>
                Add Image
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              Manage Galleries
            </Typography>
            <Stack spacing={2} mb={2}>
              <TextField
                select
                label="Select Gallery"
                value={selectedGalleryId}
                onChange={(e) => setSelectedGalleryId(e.target.value)}
                fullWidth
              >
                {galleries?.map((gallery) => (
                  <MenuItem key={gallery._id} value={gallery._id}>
                    {gallery.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleAddItemToGallery}>
                  Add Item to Gallery
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteGallery}
                >
                  Delete Gallery
                </Button>
              </Stack>
            </Stack>

            <TextField
              label="Create New Gallery"
              value={galleryData.name}
              onChange={(e) => setGalleryData({ name: e.target.value })}
              fullWidth
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCreateGallery}
            >
              Create Gallery
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              {action === "create" && (
                <Button variant="contained" onClick={handleCreateItem}>
                  Create Item
                </Button>
              )}

              {action === "edit" && (
                <Button variant="contained" onClick={handleUpdateItem}>
                  Update Item
                </Button>
              )}

              {action === "delete" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteItem}
                >
                  Delete Item
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditItemPage;
