import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Divider, Layout, Select } from "antd";
import { MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import { Drawer } from "@mui/material";
import "./MainSidebar.css";
import { fetchAllItems, filterItems } from "../../features/item/itemSlice";
import { ConfigProvider } from "antd";
import Sider from "antd/es/layout/Sider";
import { fetchAllGalleries } from "../../features/gallery/gallerySlice";

function MainSidebar({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();
  const listGallery = useSelector((state) => state.gallery.galleries);
  const listColor = ["Be", "Đỏ", "Xanh cổ vịt", "Trắng"];
  const listPrice = [
    { min: 1000000, max: 3000000, expand: "1 Triệu - 3 Triệu" },
    { min: 3000000, max: 5000000, expand: "3 Triệu - 5 Triệu" },
    { min: 5000000, max: 8000000, expand: "5 Triệu - 8 Triệu" },
  ];
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  useEffect(() => {
    dispatch(fetchAllGalleries())
  }, []);
  const handleColorChange = (checkedValues) => {
    setSelectedColors(checkedValues);
    setCurrentPage(1);
    console.log("Selected colors:", checkedValues);
  };
  const handleGalleryChange = (choosedValues) => {
    setSelectedGallery(choosedValues);
    setCurrentPage(1);
    console.log("Selected colors:", choosedValues);
  };
  const handlePriceChange = (value) => {
    setCurrentPage(1);
    const [min, max] = value.split("-").map(Number);
    setSelectedPrice({ min, max });
    console.log("Selected price range:", { min, max });
  };
  const handleClear = () => {
    setSelectedColors([]);
    setSelectedGallery(null);
    setSelectedPrice(null);
    dispatch(fetchAllItems());
  };
  const handleDisableButton = () => {
    return (
      selectedColors.length === 0 &&
      selectedGallery === null &&
      selectedPrice === null
    );
  };

  useEffect(() => {
    const queryValue = {
      selectedColors: selectedColors.length > 0 ? selectedColors : null,
      selectedGallery: selectedGallery || null,
      selectedPrice: selectedPrice || { min: null, max: null },
      currentPage,
    };
    dispatch(filterItems(queryValue));

    console.log("Dispatching filter:", queryValue);
  }, [selectedColors, selectedGallery, selectedPrice, currentPage, dispatch]);

  const siderStyle = {
    height: "400px",
    position: "fixed",
    insetInlineStart: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
    background: "white",
    paddingTop: 80,
    borderRadius: "10px",
    padding: 20,
    Flex: "none",
  };
  const [collapsed, setCollapsed] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <Layout>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
        }}
        className="mobile-menu-button"
      >
        Menu
      </Button>

      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                itemSelectedBg: "#e3a868",
                background: "white",
              },
            },
          }}
        >
          <Select
            style={{ width: "100%" }}
            options={listGallery?.map((gallery) => ({
              label: gallery.name,
              value: gallery.name,
            }))}
            placeholder="Bộ Sưu Tập"
          />
        </ConfigProvider>
        <Divider />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "red",
            },
          }}
        >
          <Checkbox.Group options={listColor} onChange={handleColorChange} />
        </ConfigProvider>
        <Divider />
        <ConfigProvider
          theme={{
            components: {
              Select: {
                itemSelectedBg: "#e3a868",
                background: "white",
              },
            },
          }}
        >
          <Select
            style={{ width: "100%" }}
            options={listPrice.map((price) => ({
              value: `${price.min}-${price.max}`,
              label: price.expand,
            }))}
            placeholder="Chọn khoảng giá"
          />
        </ConfigProvider>
      </Drawer>

      <Sider
        style={siderStyle}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        className="desktop-sider"
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                itemSelectedBg: "#e3a868",
                background: "white",
              },
            },
          }}
        >
          <Select
            style={{ width: "100%" }}
            options={listGallery?.map((gallery) => ({
              label: gallery.name,
              value: gallery.name,
            }))}
            value={selectedGallery}
            onChange={handleGalleryChange}
            placeholder="Bộ Sưu Tập"
          />
        </ConfigProvider>
        <Divider />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "red",
            },
          }}
        >
          <Checkbox.Group
            options={listColor}
            value={selectedColors}
            onChange={handleColorChange}
          />
        </ConfigProvider>
        <Divider />
        <ConfigProvider
          theme={{
            components: {
              Select: {
                itemSelectedBg: "#e3a868",
                background: "white",
              },
            },
          }}
        >
          <Select
            style={{ width: "100%" }}
            options={listPrice.map((price) => ({
              value: `${price.min}-${price.max}`,
              label: price.expand,
            }))}
            value={
              selectedPrice ? `${selectedPrice.min}-${selectedPrice.max}` : null
            }
            placeholder="Chọn khoảng giá"
            onChange={handlePriceChange}
          />
        </ConfigProvider>
        <Divider />
        <Button
          icon={<DeleteOutlined />}
          disabled={handleDisableButton()}
          onClick={handleClear}
        >
          Xóa
        </Button>
      </Sider>
    </Layout>
  );
}

export default MainSidebar;
