import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";




const Form = () => {
  const [tab, setTab] = useState("single");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const singleForm = useForm();
  const coupleForm = useForm();

  const onsubmitsingle = async (data: any) => {
    console.log("Single form submitted:", data);
    console.log("=== BUTTON CLICKED ===");
    console.log("Current tab:", tab); 
    console.log("Current errors:", errors);
    console.log("Form is valid:", Object.keys(errors).length === 0);

    
    try {
      const payload = {
        marital_status: "single",
        name: data.name,
        phone: data.phone,
        whatsapp: data.whatsapp,
        dob: data.dob,
        occupation: data.occupation,
        community: data.community,
        samaj: data.community, 
        address: data.address,
        pincode: data.pincode,
      };

      await axios.post("https://om-jewellery-form.onrender.com/api/users/single", payload);
      alert("User submitted successfully!");
      singleForm.reset();
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  const onsubmitcouple = async (data: any) => {
    console.log("Couple form submitted:", data);
    
    
    try {
      const payload = {
        marital_status: "married",
        husband_name: data.husband_name,
        wife_name: data.wife_name,
        phone: data.husband_phone,
        wife_phone: data.wife_phone,
        whatsapp: data.husband_whatsapp,
        husband_dob: data.husband_dob,
        wife_dob: data.wife_dob,
        anniversary_date: data.anniversary_date,
        husband_occupation: data.husband_occupation,
        wife_occupation: data.wife_occupation,
        husband_samaj: data.husband_samaj,
        wife_samaj: data.wife_samaj,
        address: data.address,
        pincode: data.pincode,
      };

      await axios.post("https://om-jewellery-form.onrender.com/api/users/couple", payload);
      alert("User submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full justify-center py-10 px-4">
       <Tabs value={tab} onValueChange={setTab} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single</TabsTrigger>
          <TabsTrigger value="couple">Couple</TabsTrigger>
        </TabsList>

        {/* Single Form */}
        <TabsContent value="single">
          <form onSubmit={handleSubmit(onsubmitsingle)} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Single Form</h2>

            <div className="space-y-3">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input {...singleForm.register("name", { required: "Name is required" })} placeholder="Enter your name" />
                {singleForm.formState.errors.name?.message && (<span className="text-red-500 text-sm error">{String(singleForm.formState.errors.name.message)}</span>
              )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input {...singleForm.register("phone", { required: "Phone number is required" })} placeholder="Enter your phone number" />
                {singleForm.formState.errors.phone?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.phone.message)}</span>
              )}               
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input {...singleForm.register("whatsapp")} placeholder="Enter your WhatsApp number" /> 
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input {...singleForm.register("dob", { required: "Date of birth is required" })} type="date" />
                 {singleForm.formState.errors.dob?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.dob.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input {...singleForm.register("occupation", { required: "Occupation is required"})} placeholder="Enter your occupation" />
                 {singleForm.formState.errors.occupation?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.occupation.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input {...singleForm.register("community", { required: "Society is required" })} placeholder="Enter your society or ethnicity" />
                 {singleForm.formState.errors.community?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.community.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">
                  Complete Postal Address*
                </label>
                <Textarea {...singleForm.register("address", { required:"Address is required" })} placeholder="Enter your complete postal address" />
                 {singleForm.formState.errors.address?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.address.message)}</span>
              )}   
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Pincode*</label>
              <Input {...singleForm.register("pincode", { required: "Pincode is required" })} placeholder="Enter pincode" maxLength={6}/>
               {singleForm.formState.errors.pincode?.message && (<span className="text-red-500 text-sm error" >{String(singleForm.formState.errors.pincode.message)}</span>
              )}   
            </div>

            <Button 
  type="button" 
  onClick={() => {
    console.log("=== SINGLE BUTTON CLICKED ===");
    console.log("Current tab:", tab);
    console.log("Current errors:", singleForm.formState.errors);
    console.log("Form is valid:", Object.keys(singleForm.formState.errors).length === 0);
    
    singleForm.handleSubmit(
      (data) => {
        console.log("=== SINGLE FORM VALID - SUBMITTING ===");
        onsubmitsingle(data);
      },
      (errors) => {
        console.log("=== SINGLE FORM INVALID ===");
        console.log("Validation errors:", errors);
      }
    )();
  }} 
  className="w-full"
>
  Submit
</Button>
          </form>
        </TabsContent>

        {/* Couple Form */}
        <TabsContent value="couple">
          <form onSubmit={handleSubmit(onsubmitcouple)} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Couple Form</h2>

            {/* Husband Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Husband's Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input  {...coupleForm.register("husband_name", { required: "Husband's name is required" })} placeholder="Husband's Name" />
                 {coupleForm.formState.errors.husband_name?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.husband_name.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input  {...coupleForm.register("husband_phone", { required: "Husband's phone is required" })}placeholder="Husband's Phone Number" />
                 {coupleForm.formState.errors.husband_phone?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.husband_phone.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input  {...coupleForm.register("husband_whatsapp")} placeholder="Husband's WhatsApp Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input {...coupleForm.register("husband_dob", { required: "Husband's date of birth is required"})} type="date" />
                 {coupleForm.formState.errors.husband_dob?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.husband_dob.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input {...coupleForm.register("husband_occupation", { required: "Husband's occupation is required" })}   placeholder="Husband's Occupation" />
                 {coupleForm.formState.errors.husband_occupation?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.husband_occupation.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input {...coupleForm.register("husband_samaj", { required: "Husband's society is required" })} placeholder="Husband's Society" />
                 {coupleForm.formState.errors.husband_samaj?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.husband_samaj.message)}</span>
              )}   
              </div>
            </div>

            {/* Wife Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Wife's Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input  {...coupleForm.register("wife_name", { required: "Wife's name is required"  })} placeholder="Wife's Name" />
                 {coupleForm.formState.errors.wife_name?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.wife_name.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input {...coupleForm.register("wife_phone", { required: "Wife's phone is required" })} placeholder="Wife's Phone Number" />
                 {coupleForm.formState.errors.wife_phone?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.wife_phone.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input {...coupleForm.register("wife_whatsapp")} placeholder="Wife's WhatsApp Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input  {...coupleForm.register("wife_dob", { required: "Wife's date of birth is required"  })} type="date" />
                 {coupleForm.formState.errors.wife_dob?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.wife_dob.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input {...coupleForm.register("wife_occupation", { required: "Wife's occupation is required"  })} placeholder="Wife's Occupation" />
                 {coupleForm.formState.errors.wife_occupation?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.wife_occupation.message)}</span>
              )}   
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input {...coupleForm.register("wife_samaj", { required: "Wife's society is required" })} placeholder="Wife's Society" />
                 {coupleForm.formState.errors.wife_samaj?.message && (<span className="text-red-500 text-sm error" >{String(coupleForm.formState.errors.wife_samaj.message)}</span>
              )}   
              </div>
            </div>

            {/* Anniversary Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Anniversary Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Anniversary Date*</label>
                <Input {...register("anniversary_date", { required: "Anniversary date is required" })}  type="date" />
                 {errors.anniversary_date?.message && (<span className="text-red-500 text-sm error" >{String(errors.anniversary_date.message)}</span>
              )}   
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                Complete Postal Address with Pincode*
              </label>
              <Textarea  {...register("address", { required: "Address is required" })} placeholder="Enter your complete postal address" />
               {errors.address?.message && (<span className="text-red-500 text-sm error" >{String(errors.address.message)}</span>
              )}   
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Pincode*</label>
              <Input {...register("pincode", { required: "pincode is required"})} placeholder="Enter pincode" maxLength={6}/>
               {errors.pincode?.message && (<span className="text-red-500 text-sm error" >{String(errors.pincode.message)}</span>
              )}   
            </div>

            <Button 
  type="button" 
  onClick={() => {
    console.log("=== COUPLE BUTTON CLICKED ===");
    console.log("Current tab:", tab);
    console.log("Current errors:", coupleForm.formState.errors);
    console.log("Form is valid:", Object.keys(coupleForm.formState.errors).length === 0);
    
    coupleForm.handleSubmit(
      (data) => {
        console.log("=== COUPLE FORM VALID - SUBMITTING ===");
        onsubmitcouple(data);
      },
      (errors) => {
        console.log("=== COUPLE FORM INVALID ===");
        console.log("Validation errors:", errors);
      }
    )();
  }} 
  className="w-full"
>
  Submit
</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Form;
