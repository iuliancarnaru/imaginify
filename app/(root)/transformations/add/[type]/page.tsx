import Header from "@/components/shared/Header";
import MediaUploader from "@/components/shared/MediaUploader";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

/** Taking the type from [type] param based of the dynamic folder */
async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  const transformation = transformationTypes[type];
  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
}

export default AddTransformationTypePage;
