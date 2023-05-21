import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {fetchCategoriesStart} from '../../../store/categories/categories.action';
import {getCategoriesAndDocuments} from '../../../utils/firebase.utils';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = () => {
      dispatch(fetchCategoriesStart());
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
