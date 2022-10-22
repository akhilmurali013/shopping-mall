import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { root } from "stores/config";
import {
  useGetBannersIdNameMap,
  useGetPromotedBanners,
  useUpdatePromotedBanners,
} from "stores/promoted-contents/hooks";
import { TryItOutSection } from "stores/promoted-contents/promoted-content-sections";
import routes from "stores/promoted-contents/routes";

const TryItOutForm: React.FC = () => {
  const navigate = useNavigate();
  const bannerIdNameMap = useGetBannersIdNameMap();
  const promotedBanners = useGetPromotedBanners();
  const { mutateAsync } = useUpdatePromotedBanners();

  const bannerList = useMemo(
    () => promotedBanners?.data?.data?.banners?.map((banner) => banner?.id),
    [promotedBanners]
  );
  return (
    <DetailsForm
      header={TryItOutSection?.header}
      description={TryItOutSection?.description}
      formItemNos={TryItOutSection?.noOfItems}
      selectOptions={bannerIdNameMap ?? []}
      values={bannerList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(`/a/${root}/${routes.root}`)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default TryItOutForm;
