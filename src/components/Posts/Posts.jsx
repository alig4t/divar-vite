import { memo, useEffect, useState, useCallback } from 'react';
import { Button, Card } from "@material-tailwind/react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import PostSkeleton from "../UI/PostSkeleton";
import LazyImage from "../UI/LazyImage";
import { useStateContext } from "../../context/SiteContext";
import { getCatWithAllChildren, showDate } from '../../helper/Helper';
import apiService from '../../services/api';
import useScrollPosition from '../../hooks/useScrollPosition';

const Posts = () => {
  const [queryString] = useSearchParams();
  const location = useLocation();
  const { currentCat, currentCity } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [showPosts, setShowPosts] = useState(false);

  // Use scroll position hook
  useScrollPosition(`posts-${location.pathname}${location.search}`);

  // Reset posts when filters change
  useEffect(() => {
    console.log('Filters changed, resetting posts');
    setPosts([]);
    setShowPosts(false);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    getPosts(1, true);
  }, [queryString, currentCat, currentCity]);

  const buildFilters = useCallback((page = 1) => {
    const inSearchMode = queryString.has('q');
    const catWithChildrenArray = getCatWithAllChildren(currentCat.id, currentCat.slug);

    // Build filters object
    const filters = { page, limit: 42 };
    
    // Add city filter - use the first city from currentCity
    if (currentCity.citiesList && currentCity.citiesList.length > 0) {
      filters.city = currentCity.citiesList[0].title;
    }
    
    if (inSearchMode) {
      filters.search = queryString.get('q');
    } else if (currentCat.slug && currentCat.slug !== '') {
      // If we have a specific category, use all related categories (parent + children)
      if (catWithChildrenArray.length > 1) {
        // If there are children, include all of them
        filters.categories = catWithChildrenArray;
      } else if (catWithChildrenArray.length === 1) {
        // If only one category (the current one), use it
        filters.category = catWithChildrenArray[0];
      }
    }

    // Add neighborhood filter
    if (queryString.has('districts')) {
      filters.districts = queryString.get('districts');
    }

    // Add price filter
    if (queryString.has('price')) {
      filters.price = queryString.get('price');
    }

    return filters;
  }, [queryString, currentCat, currentCity]);

  async function getPosts(page = 1, reset = false) {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    // Record start time for minimum loading duration
    const startTime = Date.now();

    try {
      const filters = buildFilters(page);
      const response = await apiService.getPosts(filters);
      
      // Handle both old format (array) and new format (object with posts and pagination)
      const newPosts = response.posts || response;
      const pagination = response.pagination;

      // Calculate elapsed time and ensure minimum 1 second loading
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 1000; // 1 second
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Wait for remaining time if needed
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      if (reset) {
        setPosts(newPosts);
        // Trigger fade-in animation after a short delay
        setTimeout(() => setShowPosts(true), 100);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }

      if (pagination) {
        setHasMore(pagination.hasMore);
        setTotalPosts(pagination.total);
      } else {
        // Fallback for old format
        const hasMorePosts = newPosts.length === 60;
        setHasMore(hasMorePosts);
      }

      setCurrentPage(page);
      
      if (reset) {
        setLoading(false);
        window.scrollBy({ top: -20, behavior: "smooth" });
      } else {
        setLoadingMore(false);
      }
    } catch (err) {
      console.error('Error in getPosts:', err);
      setError(err);
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    getPosts(currentPage + 1, false);
  };

  const renderSkeletons = () => (
    Array.from({ length: 42 }, (_, index) => <PostSkeleton key={`skeleton-${index}`} />)
  );

  const renderPosts = () => {
    if (error) {
      return (
        <div className='w-full col-span-1 md:col-span-2 h-screen text-center mt-12'>
          <h6 className='font-bold'>خطا در برقراری ارتباط</h6>
          <Button 
            variant='outlined' 
            size='sm' 
            color='pink' 
            className='my-3'
            onClick={() => getPosts(1, true)}
          >
            تلاش مجدد
          </Button>
        </div>
      );
    }

    if (posts.length === 0 && !loading) {
      return (
        <div className='w-full col-span-1 md:col-span-2 h-screen text-center mt-12'>
          <h6 className='font-bold'>آگهی ای در این زمینه وجود ندارد</h6>
          <Link to='/'>
            <Button variant='outlined' size='sm' color='pink' className='my-3'>
              صفحه اصلی
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <>
        {posts.map((item, index) => (
          <div 
            className={`w-full transition-all duration-500 ease-out ${
              showPosts 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: `${Math.min(index * 50, 800)}ms` // Stagger animation, max 800ms
            }}
            key={`${item.code}-${index}`}
          >
            <Link to={`/v/${item.code}/${item.title.replace(/\s+|\/|\u200C/g, '-').toLowerCase()}`}>
              <Card className="w-full overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 post-card">
                <div className="w-full h-full flex items-center justify-between p-3 border-2 border-gray-50 hover:border-blue-gray-100 transition-colors duration-200">
                  <div className="flex-1 min-h-32 overflow-hidden flex flex-col justify-between gap-2 ml-3">
                    <h2 className="text-14 md:text-16 font-bold md:font-extrabold line-clamp-2">
                      {item.title}
                    </h2>
                    <div className="flex flex-col gap-0.5 text-gray-600 align-bottom text-12 md:text-14">
                      <p className="line-clamp-1">
                        {item.postDetail.status ? 
                          item.postDetail.status.type === 'number' ?
                            Number(item.postDetail.status.value).toLocaleString() + " " + item.postDetail.status.unit
                            : item.postDetail.status.value
                          : null
                        }
                      </p>

                      {item.postDetail?.price.map((pr, index) => (
                        <p key={index} className="line-clamp-1">
                          {item.postDetail?.price.length > 1 
                            ? `${pr.title}: ${Number(pr.value).toLocaleString()} تومان`
                            : `${Number(pr.value).toLocaleString()} تومان`
                          }
                        </p>
                      ))}

                      <p className="line-clamp-1">
                        {showDate(item.created_at) + " در "} {item.location?.mahal}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center bg-blue-gray-50 rounded-md">
                    <LazyImage 
                      src={item.images?.[0] || ''} 
                      alt={item.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-md object-cover"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
        
        {/* Loading more indicator */}
        {loadingMore && (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <div 
                key={`loading-${index}`}
                className="w-full animate-pulse"
                style={{ 
                  animationDelay: `${index * 100}ms` 
                }}
              >
                <PostSkeleton />
              </div>
            ))}
          </>
        )}
        
        {/* Load More Button */}
        {hasMore && !loading && !loadingMore && (
          <div className="col-span-full flex items-center justify-center py-8">
            <Button 
              onClick={handleLoadMore}
              variant="outlined"
              color="pink"
              size="lg"
              className="px-8 py-3 hover:scale-105 transition-transform duration-200 animate-fade-in"
            >
              نمایش آگهی‌های بیشتر
            </Button>
          </div>
        )}
        
        {/* End of results */}
        {!hasMore && posts.length > 0 && (
          <div className="col-span-full  text-center py-8">
            <p className="text-gray-500">
              {totalPosts > 0 ? `${totalPosts} آگهی نمایش داده شد` : 'پایان نتایج'}
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-3 md:gap-x-5 md:gap-y-5">
      {loading ? renderSkeletons() : renderPosts()}
    </div>
  );
};

export default memo(Posts);