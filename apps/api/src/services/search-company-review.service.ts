import SearchCompanyReviewRepository from '@/repositories/company-reviews/search-company-review.repository';
import { searchCompanyReviewsRequest } from '@/interfaces/search-company-review.interface';

class SearchCompanyReviewService {
  private searchCompanyReviewRepository: SearchCompanyReviewRepository;

  constructor() {
    this.searchCompanyReviewRepository = new SearchCompanyReviewRepository();
  }

  searchCompanyReviews = async (req: searchCompanyReviewsRequest) => {
    return await this.searchCompanyReviewRepository.searchCompanyReviews(req);
  };
}

export default SearchCompanyReviewService;
