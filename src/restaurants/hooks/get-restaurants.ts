import { useQuery } from "react-query";

import axiosInstance from "axios-instance";
import { Restaurant } from "types";

const getRestaurants = (): Promise<{ restaurants: Restaurant[] }> =>
  axiosInstance.post("/restaurants");

const useGetRestaurants = () =>
  useQuery("get-restaurants", getRestaurants, {
    initialData: {
      restaurants: [
        {
          restaurantId: "123",
          restaurantName: "Paragon",
          ownerName: "Mohan",
          priorityPhoneNumber: {
            countryCode: "+91",
            phoneNumber: 9898989898,
          },
          restaurantPhoneNumberPrimary: {
            countryCode: "+91",
            phoneNumber: 9898989898,
          },
          restaurantPhoneNumberSecondary: {
            countryCode: "+91",
            phoneNumber: 9898989898,
          },
          ownerPhoneNumberPrimary: {
            countryCode: "+91",
            phoneNumber: 9898989898,
          },
          ownerPhoneNumberSecondary: {
            countryCode: "+91",
            phoneNumber: 9898989898,
          },
          email: "a@b.com",
          floorId: 123,
          averageCostPerPerson: 100,
          cuisineStyleIds: [123, 124, 125, 126, 127],
          dishCategoryIds: [123, 345],
          openingTime: "10:00",
          closingTime: "20:00",
          restaurantImageUrl: "https://aws.proximety.io/s3/image1.jpg",
          restaurantLogoUrl: "https://aws.proximety.io/s3/image1.jpg",
          menuImageUrl: "https://aws.proximety.io/s3/image1.jpg",
          gstCertificateUrl: "https://aws.proximety.io/s3/image1.jpg",
          panFileUrl: "https://aws.proximety.io/s3/image1.jpg",
          fssaiCertificateUrl: "https://aws.proximety.io/s3/image1.jpg",
          rating: 4.1,
          numberOfRatings: 99,
          restaurantOpen: false,
          cuisineTypeId: 123,
          bankAccount: {
            bankAccountId: "123",
            accountName: "Savings account",
            accountNumber: "321321321",
            bankName: "SBI",
            ifscCode: "SBIN13",
            upiId: "paragon@upi",
          },
        },
      ],
    },
  });

export default useGetRestaurants;
