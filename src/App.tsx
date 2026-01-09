import InfniteScroll from "./components/infinite_scrolling/infinite_scrolling";
import CustomCalendar from "./components/custom_calendar/customCalender";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScrollingWithReactQuery from "./components/infinite_scrolling/with_reactquery";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Multiselectwithsearch from "./pages/multiselectwithsearch";
import Progressbar from "./pages/progressbar";
import Stepper from "./pages/stepper";
import Multifileupload from "./pages/multifileupload";
import ImageGalleryUploader from "./pages/imagegallary";
import Tracker from "./pages/tracker";
import Products from "./pages/products";
import ProductDetails from "./pages/productdetails";
import FileExplorer from "./pages/fileExplorer";
import ForgetPassword from "./pages/forgetpassword";
import Portfolio from "./pages/portfolio";
import InfiniteScroll from "./pages/infinite-scroll";
import React from "react";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Multiselectwithsearch />} />
          <Route path="/progress-bar" element={<Progressbar />} />
          <Route path="/infinite-scroll" element={<InfniteScroll />} />
          <Route
            path="/infinite-scroll-with-react-query"
            element={<InfiniteScrollingWithReactQuery />}
          />
          <Route path="/custom-calender" element={<CustomCalendar />} />
          <Route path="/stepper" element={<Stepper />} />
          <Route path="/multifile-upload" element={<Multifileupload />} />
          <Route path="/gallary" element={<ImageGalleryUploader />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/explorer" element={<FileExplorer />} />
          <Route path="/otp-input" element={<ForgetPassword />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/scroll" element={<InfiniteScroll />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
