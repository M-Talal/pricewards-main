"use server";

import { base } from "@/utils/config";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function addProduct(prevState: any, formData: FormData) {
  let data = null;
  try {
    const session = await getSession();
    console.log("formData", formData);

    const name = formData.get("name");
    const description = formData.get("description");
    const imageUrl = JSON.parse((formData.get("imagesUrl") as string) || "[]");
    const price = formData.get("price");
    const code = formData.get("code");
    const stock = formData.get("stock");
    const length = formData.get("length");
    const width = formData.get("width");
    const seasonalCategory = formData.get("seasonal-category");
    const fabricCategory = formData.get("fabric-category");
    const productGender = formData.get("product-gender");
    const discount = formData.get("discount-price");
    const category = formData.get("category");
    const freeShipping = formData.get("free-shipping") === "on" ? true : false;

    const small = formData.get("s") === "on" ? true : false;
    const medium = formData.get("m") === "on" ? true : false;
    const large = formData.get("l") === "on" ? true : false;

    console.log("small", small);
    console.log("medium", medium);
    console.log("large", large);

    let size = [] as string[];
    if (small) {
      size.push("S");
    }
    if (medium) {
      size.push("M");
    }
    if (large) {
      size.push("L");
    }

    console.log("size", size);

    const response = await fetch(`${base.URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        name,
        description,
        imageUrl,
        price,
        code,
        stock,
        length,
        width,
        category,
        seasonalCategory,
        fabricCategory,
        productGender,
        discount,
        freeShipping,
        size,
      }),
    });
    data = await response.json();
    if (data?.success === true) {
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
  revalidateTag("products");
  return data;
}

export async function addCustomProduct(previousState: any, formData: FormData) {
  try {
    const session = await getSession();
    const name = formData.get("name");
    const category = formData.get("category");
    const imageUlr = formData.get("imageUrl");

    console.log("name", session?.user?.role);

    // only admin can add custom product
    if (session?.user?.role !== "admin") {
      return {
        error: "You are not authorized to add custom product",
      };
    }

    return {
      success: true,
      message: "Product added successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function updateCustomProduct(product: any, fabrics: any) {
  try {
    const session = await getSession();
    console.log("product", product);
    console.log("fabrics", fabrics);

    console.log(session);

    const response = await fetch(
      `${base.URL}/api/product/custom-product/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": session?.user?.token,
        },
        body: JSON.stringify({
          product: product,
          fabrics: fabrics,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
export async function AddToWishlistProduct(prevState: any, formData: FormData) {
  try {
    const productId = formData.get("productId");
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/wish/addToWishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function updateProduct(prevState: any, formData: FormData) {
  let data = null;
  try {
    const session = await getSession();
    console.log("formData", formData);
    const id = formData.get("id");
    const name = formData.get("name");
    const description = formData.get("description");
    const imageUrl = JSON.parse((formData.get("imagesUrl") as string) || "[]");
    const price = formData.get("price");
    const code = formData.get("code");
    const stock = formData.get("stock");
    const length = formData.get("length");
    const width = formData.get("width");
    const seasonalCategory = formData.get("seasonal-category");
    const fabricCategory = formData.get("fabric-category");
    const productGender = formData.get("product-gender");

    const category = formData.get("category");
    const freeShipping = formData.get("free-shipping") === "on" ? true : false;

    const discountPrice = formData.get("discount") === "on" ? true : false;
    const discount = formData.get("discount-price");
    const Price = discountPrice ? discount : 0;
    console.log(Price);

    const small = formData.get("s") === "on" ? true : false;
    const medium = formData.get("m") === "on" ? true : false;
    const large = formData.get("l") === "on" ? true : false;

    console.log("small", small);
    console.log("medium", medium);
    console.log("large", large);

    let size = [] as string[];
    if (small) {
      size.push("S");
    }
    if (medium) {
      size.push("M");
    }
    if (large) {
      size.push("L");
    }

    console.log("size", size);

    const response = await fetch(`${base.URL}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        name,
        description,
        imageUrl,
        price,
        code,
        stock,
        length,
        width,
        category,
        seasonalCategory,
        fabricCategory,
        productGender,
        discount,
        freeShipping,
        size,
      }),
    });
    data = await response.json();
    console.log("data", data);
    if (data?.success === true) {
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
  revalidateTag("products");
  return data;
}

export async function getAllUserProducts() {
  try {
    const session = await getSession();
    const response = await fetch(`${base.URL}/api/product/user/products`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": session?.user?.token,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getAllCategoryProducts(category?: string) {
  try {
    const response = await fetch(
      `${base.URL}/api/product?category=${category}`,
      {
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();

    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getAllProducts(search?: any) {
  const { category, name, minPrice, maxPrice } = search;

  // pass only those have value
  const query = new URLSearchParams();
  if (category) {
    query.set("category", category);
  }
  if (name) {
    query.set("name", name);
  }

  if (minPrice && maxPrice) {
    query.set("minPrice", minPrice);
    query.set("maxPrice", maxPrice);
  }

  const url = `${base.URL}/api/product?${query.toString()}`;
  console.log(url);
  try {
    const response = await fetch(`${url}`, {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();

    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getWishlistProducts(search?: any) {
  const { category, name, minPrice, maxPrice } = search;

  // pass only those have value
  const query = new URLSearchParams();
  if (category) {
    query.set("category", category);
  }
  if (name) {
    query.set("name", name);
  }

  if (minPrice && maxPrice) {
    query.set("minPrice", minPrice);
    query.set("maxPrice", maxPrice);
  }

  const url = `${base.URL}/api/wish/wishlist?${query.toString()}`;
  console.log(url);
  try {
    const session = await getSession();
    const response = await fetch(`${url}`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": session?.user?.token,
      },
      cache: "no-cache",
    });
    const data = await response.json();

    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getAllSearchProducts(name: string) {
  try {
    const response = await fetch(`${base.URL}/api/product?name=${name}`, {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();

    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${base.URL}/api/product/${id}`, {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Oh, Something went wrong Check your internet",
    };
  }
}

export async function getBestSellingProducts() {
  try {
    const response = await fetch(
      `${base.URL}/api/product/getBestSellingProducts`,
      {
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getAllUserBestSellingProducts(userId: string) {
  try {
    const response = await fetch(
      `${base.URL}/api/product/topProducts/${userId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function approveProduct(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    const productId = formData.get("productId");
    console.log("productId", productId);
    const response = await fetch(`${base.URL}/api/product/approveProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (data?.success === true) {
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
  revalidatePath("/approve-products");
}

export async function getCustomProductsGroupedByCategory() {
  try {
    const response = await fetch(`${base.URL}/api/product/custom-product`, {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Oh, Something went wrong Check your internet",
    };
  }
}
