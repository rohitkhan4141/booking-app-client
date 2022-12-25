import { useQuery } from "@tanstack/react-query";

function useFetchProducts(url) {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  return { products, isLoading, refetch };
}

export default useFetchProducts;
