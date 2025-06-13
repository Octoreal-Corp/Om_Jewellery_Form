import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
                <label className="mb-1 font-medium">Name / नाम*</label>
                <Input placeholder="Enter your name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number / फोन नंबर*</label>
                <Input placeholder="Enter your phone number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number / व्हाट्सएप नंबर</label>
                <Input placeholder="Enter your WhatsApp number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth / जन्म तिथि*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation / पेशा*</label>
                <Input placeholder="Enter your occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity) / समाज*</label>
                <Input placeholder="Enter your society or ethnicity" />
              </div>

              {/* Detailed Address Section */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Plot/Flat No. / प्लॉट/फ्लैट नंबर*</label>
                <Input placeholder="Enter your plot or flat number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">House/Building Name / मकान/भवन का नाम*</label>
                <Input placeholder="Enter your house or building name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Locality / क्षेत्र*</label>
                <Input placeholder="Enter your locality" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">City / शहर*</label>
                <Input placeholder="Enter your city" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">State / राज्य*</label>
                <Input placeholder="Enter your state" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Pincode / पिनकोड*</label>
                <Input placeholder="Enter your area pincode" />
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
              <h3 className="text-lg font-medium mb-2">Husband's Details / पति की जानकारी</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name / नाम*</label>
                <Input placeholder="Husband's Name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth / जन्म तिथि*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation / पेशा*</label>
                <Input placeholder="Husband's Occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity) / समाज*</label>
                <Input placeholder="Husband's Society" />
              </div>
            </div>

            {/* Wife Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Wife's Details / पत्नी की जानकारी</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name / नाम*</label>
                <Input placeholder="Wife's Name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Date of Birth / जन्म तिथि*</label>
                <Input type="date" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Occupation / पेशा*</label>
                <Input placeholder="Wife's Occupation" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Society (Ethnicity) / समाज*</label>
                <Input placeholder="Wife's Society" />
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Contact Details / संपर्क विवरण</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number / फोन नंबर*</label>
                <Input placeholder="Enter your phone number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">WhatsApp Number / व्हाट्सएप नंबर</label>
                <Input placeholder="Enter your WhatsApp number" />
              </div>
            </div>

            {/* Anniversary Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Anniversary Details / वर्षगांठ विवरण</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Anniversary Date / वर्षगांठ तिथि*</label>
                <Input type="date" />
              </div>
            </div>

            {/* Detailed Address Section */}
            <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Address Details / पता विवरण</h3>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Plot/Flat No. / प्लॉट/फ्लैट नंबर*</label>
                <Input placeholder="Enter your plot or flat number" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">House/Building Name / मकान/भवन का नाम*</label>
                <Input placeholder="Enter your house or building name" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Locality / क्षेत्र*</label>
                <Input placeholder="Enter your locality" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">City / शहर*</label>
                <Input placeholder="Enter your city" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">State / राज्य*</label>
                <Input placeholder="Enter your state" />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Pincode / पिनकोड*</label>
                <Input placeholder="Enter your area pincode" />
              </div>
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
