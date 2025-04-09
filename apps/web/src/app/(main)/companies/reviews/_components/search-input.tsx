import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Input } from '@/components/shadcn-ui/input';
import Icon from '@/components/ui/icon';

const SearchInput = () => {
  return (
    <div className="relative w-full">
      <Input placeholder="Find company or job title" />
      <Icon
        icon={faMagnifyingGlass}
        className="text-primary-gray absolute right-3 top-3 w-3"
      />
    </div>
  );
};

export default SearchInput;
