import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE, MediaFrame } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, addPost } from "../../store/postSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toPlainData } from "../../lib/post-utils";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage || "",
      },
    });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data) => {
    setIsSubmitting(true);

    try {
      if (!post && !userData?.$id) {
        throw new Error("Please sign in again before creating a post.");
      }

      if (post) {
        const file = data.image[0]
          ? await appwriteService.uplaoadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        const plainPost = dbPost ? toPlainData(dbPost) : null;

        if (plainPost) {
          dispatch(updatePost(plainPost));
        }
        if (plainPost) navigate(`/post/${plainPost.$id}`);
      } else {
        const file = data.image[0]
          ? await appwriteService.uplaoadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          const plainPost = dbPost ? toPlainData(dbPost) : null;

          if (plainPost) {
            dispatch(addPost(plainPost));
            navigate(`/post/${plainPost.$id}`);
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          }),
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-[28px] border border-border bg-bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="post-slug"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        <div className="space-y-5">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && post.featuredImage && (
            <MediaFrame
              fileId={post.featuredImage}
              alt={post.title}
              ratio="aspect-[4/3]"
              fit="contain"
              rounded="rounded-2xl"
              loading="lazy"
              fallbackLabel="Preview"
              fallbackHint="Featured Image"
            />
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="w-full"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            bgColor={
              post
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-accent hover:bg-accent-hover"
            }
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Skeleton className="h-4 w-28 bg-bg/30" />
              </span>
            ) : post ? (
              "Update Post"
            ) : (
              "Publish Post"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
