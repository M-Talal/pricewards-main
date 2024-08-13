import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailsTab() {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="detail">Detail Product</TabsTrigger>
          <TabsTrigger value="merchant">Merchant</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          <div>
            <h1 className="text-3xl font-bold"></h1>
            <p className="text-muted-foreground font-semibold"></p>
          </div>
        </TabsContent>
        <TabsContent value="">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
