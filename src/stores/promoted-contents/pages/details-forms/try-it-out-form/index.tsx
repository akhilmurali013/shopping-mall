import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import {
  useGetBannersIdNameMap,
  useGetPromotedBanners,
  useUpdatePromotedBanners,
} from "stores/promoted-contents/hooks";

const TryItOutForm: React.FC<{
  header: PromotedSectionType["header"];
  description: PromotedSectionType["description"];
  noOfItems: PromotedSectionType["noOfItems"];
  redirectUrl: PromotedSectionType["redirectUrl"];
}> = ({ header, description, noOfItems, redirectUrl }) => {
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
      header={header}
      description={description}
      formItemNos={noOfItems}
      selectOptions={bannerIdNameMap ?? []}
      values={bannerList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(redirectUrl)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default TryItOutForm;
