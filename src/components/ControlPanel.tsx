import { RegionFilter } from './RegionFilter';

interface Props {
  onRegionSelect: (region: string) => void;
}

export const ControlPanel = ({ onRegionSelect }: Props) => {
  return (
    <div className="flex items-center py-8 flex-wrap">
      <RegionFilter onSelect={onRegionSelect} />
    </div>
  );
};
