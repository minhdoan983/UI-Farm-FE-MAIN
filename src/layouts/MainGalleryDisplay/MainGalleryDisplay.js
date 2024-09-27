import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import { useNavigate } from 'react-router-dom';
function MainGalleryDisplay() {
  const navigate = useNavigate()
    return (
        <ImageList
        sx={{ width: '100%', height: '100%', overflow: 'hidden',objectFit: 'cover',
        }}
        cols={3} 
      >
        <ImageListItem key="subtitle" cols={3} rows={2}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            textAlign="center"
            bgcolor="tranparent"
            sx={{
              color: '#A0522D',
              fontWeight: 'bold',
            }}
          >
            BỘ SƯU TẬP ĐẤT NƯỚC
          </Typography>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={1} rows={2}> 
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              onClick={()=>navigate('/item')}
              style={{cursor:'pointer'}}
            />

          </ImageListItem>
        ))}
      </ImageList>
      
    );
}

const itemData = [
    {
        img: img1,
        title: 'Breakfast',
        author: '@bkristastucchio',

    },
    {
        img: img2,
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: img3,
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: img4,
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: img5,
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: img6,
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },

];

export default MainGalleryDisplay