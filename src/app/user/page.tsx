import Card from "@/app/components/custom/Card";
import Charts from "@/app/components/custom/Charts";
import CardPrototype from "@/app/components/custom/CardPrototype";
import { AppAssets } from "@/constants/assets";
import { HiOutlineSearch, HiUser, HiUserAdd } from "react-icons/hi";
import Skeleton from "@/app/components/Skeleton";
import SkeletonCard from "@/app/components/Skeleton/SkeletonCard";
import UserList from "@/app/components/custom/UserList";
import { Dummy } from "@/constants/dummy";
import Pagination from "@/app/components/custom/Paginated";
import { Button } from "@/app/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { columns } from "./components/columns";
import { DataTable } from "@/app/components/controls/datatable";
import APIController from "@/controllers/remote_controller";
import APIRoutes from "@/constants/api_routes";

export default async function Home() {
  // const posts = await APIController.get(APIRoutes.posts);

  // console.log(posts);

  return (
    <div>
      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-2">
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
        <div className="w-full md:w-1/3 md:px-2">
          <Card
            title="Employees"
            subtitle="Team Lead"
            cardImage={JSON.stringify(AppAssets.avatar)}
            iconLimit={3}
            icons={[
              { icon: HiOutlineSearch, href: "/" },
              { icon: HiUser, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
              { icon: HiUserAdd, href: "/" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-5">
        <div className="w-full md:w-1/1 md:px-2 self-stretch">
          <CardPrototype className="flex flex-col items-center">
            <Charts />
            <Button>Add More</Button>
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <CardPrototype>
            <Charts
              option={{
                series: [44, 55, 13, 33],
                labels: ["Apple", "Mango", "Orange", "Watermelon"],
              }}
              type="donut"
            />
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <CardPrototype>
            <Charts
              option={{
                series: [44, 66, 30, 33, 33, 56, 40],
                labels: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              }}
              type="donut"
            />
          </CardPrototype>
        </div>
        <div className="w-full md:w-1/3 md:px-2 self-stretch">
          <Skeleton isLoading={true} skeletonComponent={<SkeletonCard />}>
            <CardPrototype>
              <div>Hello</div>
            </CardPrototype>
          </Skeleton>
        </div>
      </div>
      <div className="flex flex-wrap overflow-x-hidden md:-mx-1 py-3 gap-y-5">
        <div className="w-full md:w-1/3 md:px-2 self-stretch h-96">
          <CardPrototype className="scrollbar-hide">
            <UserList users={Dummy.users} />
          </CardPrototype>
        </div>
        <div className="w-full md:w-2/3 md:px-2 self-stretch">
          <CardPrototype>
            <h2 className="text-xl text-primary">FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              {Dummy.faqs.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer} </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardPrototype>
        </div>
      </div>

      <div className="flex flex-wrap overflow-x-hidden  py-3 gap-y-5">
        <div className="w-full">
          <CardPrototype className="scrollbar-hide">
            <DataTable columns={columns} data={Dummy.payments} />
          </CardPrototype>
        </div>
      </div>

      <div className="flex flex-wrap overflow-x-hidden  py-3 gap-y-5">
        <div className="w-full">
          <CardPrototype className="scrollbar-hide">
            <Pagination />
          </CardPrototype>
        </div>
      </div>
    </div>
  );
}
