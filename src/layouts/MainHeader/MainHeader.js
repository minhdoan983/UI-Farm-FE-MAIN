import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './MainHeader.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems, fetchItemBySearch } from '../../features/item/itemSlice';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuth from '../../hooks/useAuth';
import PersonIcon from '@mui/icons-material/Person';
import { getPayment } from '../../features/payment/paymentSlice';

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(false); 
  const cart = useSelector((state) => state.cart.cart);
  const count = isAuthenticated ? cart : JSON.parse(localStorage.getItem('cart'));
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
    if (user?.role === 'admin') setIsAdmin(true);
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingUp(currentScrollPos < lastScrollPos || currentScrollPos <= 0);
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 1000); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearchValue.length > 0) {
      dispatch(fetchItemBySearch(debouncedSearchValue));
    } else {
      dispatch(fetchAllItems());
    }
  }, [debouncedSearchValue, dispatch]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleOpenCart = () => {
    navigate('/cart');
  };

  const handleUserMenuClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleUserMenuClose();
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewOrders = async () => {
    await dispatch(getPayment());
    navigate('/orders');
    handleUserMenuClose();
  };

  const handleViewProfile = () => {
    navigate('/profile');
    handleUserMenuClose();
  };
  const handleManageOrderPage = () => {
    navigate('/manageorderpage');
    handleUserMenuClose();
  };
  const handleEditItem = () => {
    navigate('/edititem');
    handleUserMenuClose();
  };

  return (
    <header className={`header ${isScrollingUp ? '' : 'header-hidden'}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2 onClick={() => navigate('/')}>UI Farm</h2>
          </div>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><NavLink to="/">TRANG CHỦ</NavLink></li>
              <li><NavLink to="/item">SẢN PHẨM</NavLink></li>
              <li><NavLink to="/store">CỬA HÀNG</NavLink></li>
              <li><NavLink to="/contact">LIÊN HỆ</NavLink></li>
            </ul>
          </nav>

          <div className="header-right">
            <div className="cart-container">
              <Badge badgeContent={count?.length || 0} color="warning">
                <ShoppingCartIcon sx={{ "&:hover": { cursor: 'pointer' } }} fontSize='large' onClick={handleOpenCart} />
              </Badge>
            </div>
            {location.pathname === '/item' && ( 
              <div className="search-container">
                <SearchIcon fontSize='large' onClick={toggleSearch} />
                <input
                  type="text"
                  className={`search-input ${isSearchOpen ? 'open' : ''}`}
                  placeholder="Tìm kiếm..."
                  onChange={handleSearchChange}
                />
              </div>
            )}

            {isAuthenticated ? (
              <div className="user-menu">
                <button onClick={handleUserMenuClick} className="user-icon">
                  <PersonIcon fontSize='large' />
                </button>
                {anchorEl && (
                  <div className="dropdown-menu">
                    {isAdmin ? (
                      <>
                        <button onClick={handleEditItem}>Quản Lí Sản Phẩm</button>
                        <button onClick={handleManageOrderPage}>Quản Lí Đơn Hàng</button>
                      </>
                    ) : null}
                    <button onClick={handleViewProfile}>Thông Tin Cá Nhân</button>
                    {!isAdmin ? (
                      <button onClick={handleViewOrders}>Xem Đơn Hàng</button>
                    ): null}
                    <button onClick={handleLogout}>Đăng Xuất</button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login" className="login-btn">Đăng Nhập</NavLink>
            )}

            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
