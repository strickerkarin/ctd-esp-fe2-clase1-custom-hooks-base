import { FC } from 'react';
import { useGetLocationQuery } from 'features/locations/locations.endpoints';
import { LocationDetailComponent } from 'features/locations/detail/index';

export type LocationDetailContainerProps = {
  id: number;
  loadingComponent?: any;
};

const LocationDetailContainer: FC<LocationDetailContainerProps> = ({
  id,
  loadingComponent
}: LocationDetailContainerProps) => {
  const { data: location, error, isLoading } = useGetLocationQuery({ id });

  if (error) return <div>Error when loading. Please try again later.</div>;

  return (
    <>{isLoading ? <>{loadingComponent()}</> : <LocationDetailComponent location={location} />}</>
  );
};

export default LocationDetailContainer;
