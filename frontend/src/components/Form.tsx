import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Form = () => {
  return (
    <div className="flex w-full justify-center py-10 px-4">
      <Tabs defaultValue="single" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single</TabsTrigger>
          <TabsTrigger value="couple">Couple</TabsTrigger>
        </TabsList>

        {/* Single Form */}
        <TabsContent value="single">
          <form className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Single Form</h2>

            <div className="space-y-3">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input placeholder="Enter your name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input placeholder="Enter your phone number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input placeholder="Enter your WhatsApp number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input placeholder="Enter your occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input placeholder="Enter your society or ethnicity" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">
                  Complete Postal Address with Pincode*
                </label>
                <Textarea placeholder="Enter your complete postal address" />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </TabsContent>

        {/* Couple Form */}
        <TabsContent value="couple">
          <form className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Couple Form</h2>

            {/* Husband Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Husband's Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input placeholder="Husband's Name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input placeholder="Husband's Phone Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input placeholder="Husband's WhatsApp Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input placeholder="Husband's Occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input placeholder="Husband's Society" />
              </div>
            </div>

            {/* Wife Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Wife's Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name*</label>
                <Input placeholder="Wife's Name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number*</label>
                <Input placeholder="Wife's Phone Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number</label>
                <Input placeholder="Wife's WhatsApp Number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation*</label>
                <Input placeholder="Wife's Occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity)*</label>
                <Input placeholder="Wife's Society" />
              </div>
            </div>

            {/* Anniversary Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Anniversary Details</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Anniversary Date*</label>
                <Input type="date" />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                Complete Postal Address with Pincode*
              </label>
              <Textarea placeholder="Enter your complete postal address" />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Form;