import Button from "../button";
import Textbox from "../text";
import Icon from "./icon";
import Link from "next/link";
import Form from "next/form";

type Current = { maxPrice: string; bedrooms: string , moveIn: string};

export default function Preferences({current} : {current: Current}) {
  return (
    <aside className="">
      <section
        className="rounded-xl border border-border-inputs bg-white p-5"
        aria-labelledby="preferences-title">
        <h2
          id="preferences-title"
          className="text-lg font-semibold tracking-tight">
          Your preferences
        </h2>
        <Form
          key={`${current.maxPrice}|${current.bedrooms}|${current.moveIn}`}
          action="/listings"
          scroll={false}
          className="mt-5 grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-1">
          <div className="mb-5 flex items-center justify-between text-[11px] sm:col-span-2 lg:col-span-1">
            <p className="text-under-input">
              Refine your search
            </p>
            <Link href="/listings" className="text-poly-green-dark">
              Reset
              </Link>
          </div>

          <div className="mb-5 [&_label]:text-xs [&_label]:font-medium [&>div]:gap-2">
            <Textbox
              id="browse-rent"
              name="max_price"
              type="number"
              min="0"
              placeholder="e.g. 3000"
              defaultValue={current.maxPrice}
              className="h-11 w-full text-xs font-normal">
              Max monthly rent
            </Textbox>
          </div>

          <fieldset className="mb-5 min-w-0">
            <legend className="mb-2 text-xs font-medium">
              Bedrooms
            </legend>
            <div className="flex h-11 items-center justify-between rounded-md border border-border-inputs px-3 text-xs">
              {[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                 { label: "4+", value: "" },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="bedrooms"
                    value={opt.value}
                    defaultChecked={current.bedrooms === opt.value}
                    className="accent-poly-green-dark"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>


          <div className="mb-5 min-w-0 [&_label]:text-xs [&_label]:font-medium [&>div]:gap-2">
            <Textbox
              id="browse-move-in"
              name="move_in"
              type="date"
              defaultValue={current.moveIn}
              className="h-11 w-full min-w-0 text-xs font-normal">
              Move-in date
            </Textbox>
          </div>
          {[
            {
              title: "Home type",
              options: [
                { label: "House", checked: false },
                { label: "Apartment", checked: false },
                { label: "Studio", checked: false }
              ]
            },
            {
              title: "Nice to have",
              options: [
                { label: "In-unit laundry", checked: false },
                { label: "Parking included", checked: false },
                { label: "Pets allowed", checked: false }
              ]
            }
          ].map((group) => (
            <fieldset
              key={group.title}
              className="mb-5 border-t border-border-inputs pt-5">
              <legend className="sr-only">{group.title}</legend>

              <p
                aria-hidden="true"
                className="mb-4 text-xs font-medium">
                {group.title}
              </p>

              <div className="flex flex-col gap-4">
                {group.options.map((option) => (
                  <label
                    key={option.label}
                    className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      defaultChecked={option.checked}

                      className="size-4 rounded border-border-inputs accent-poly-green-dark"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <Button type="submit" variant="primary" className="h-10 w-full text-xs font-semibold sm:col-span-2 lg:col-span-1">
            Apply Filters
          </Button>

        </Form>
      </section>
      <div className="mt-3.5 hidden rounded-xl bg-mini-labels p-4 lg:block">
        <Icon
          name="cap"
          className="mb-3 size-5 text-poly-green-dark"
        />
        <h3 className="mb-2 text-xs font-medium">
          Students are welcome here.
        </h3>
        <p className="text-[11px] leading-relaxed text-under-input">
          Every housing listing accepts student applicants.
          Review each home’s lease requirements before applying.
        </p>
      </div>
    </aside>
  );
}
