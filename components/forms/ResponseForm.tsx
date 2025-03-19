"use client";
import { createFormDefaultValues } from "@/helpers/createFormdefaultValues";
import { generateZodSchema } from "@/helpers/generateZodSchema";
import { ResponseFormProps } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useSendFormResponse } from "@/hooks/useSendFormResponse";
import { SvgLoading } from "../reusable-comps/SvgLoading";
import { toast } from "sonner";
import SuccessMessage from "../reusable-comps/SuccessMessage";
import { Slider } from "../ui/slider";
import { CalendarIcon, Star } from "lucide-react";
import { Switch } from "../ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { getDateDisableLogic } from "@/helpers/getDateDisableLogic";

const ResponseForm = ({
  id,
  buttonText,
  title,
  description,
  formConfig,
  successMessage,
}: ResponseFormProps) => {
  const generatedSchema = generateZodSchema(formConfig);
  const defaultValues = createFormDefaultValues(formConfig);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };
  const form = useForm<z.infer<typeof generatedSchema>>({
    resolver: zodResolver(generatedSchema),
    defaultValues,
  });

  const { mutate, isPending: loading } = useSendFormResponse(id);
  const handleSubmit = (data: z.infer<typeof generatedSchema>) => {
    const isValid = generatedSchema.safeParse(data);
    if (!isValid.success) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      mutate(data, {
        onSuccess: () => {
          toast.success("Your response is submitted succesfully");
          setHasSubmitted(true);
          setSliderValues({});
          form.reset();
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  return (
    <>
      {hasSubmitted ? (
        <div className="flex  justify-center items-center py-3 flex-col">
          <div className=" w-full flex flex-col items-center justify-center ">
            <h4 className="text-[1.6rem] font-[600] ">{title}</h4>
            <h6 className="font-[500] max-w-[400px] mx-auto text-center text-regular text-[1.1rem]">
              {successMessage || " Thanks for submitting your info!"}
            </h6>
            <div className="w-full flex items-center justify-center ">
              <Button
                variant={"link"}
                onClick={() => setHasSubmitted(false)}
                className="px-0"
              >
                <span>Submit another response</span>
              </Button>
            </div>
          </div>
          <div className=" mt-auto absolute bottom-0 items-center justify-center ">
            <div className="max-w-[300px] mx-auto flex gap-1 flex-col text-center my-5">
              <p className="text-regular text-[14px] font-[500]">
                This form is powered by{" "}
                <a href="/" className="underline underline-offset-2">
                  Gather
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto w-full py-10">
          <div className="flex flex-col mb-7">
            <h4 className="text-[1.6rem] font-[600] ">{title}</h4>
            <h6 className="font-[500] text-regular text-[1.1rem]">
              {description}
            </h6>
          </div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {formConfig.map((c) => {
                return (
                  <div key={c.id}>
                    {["text", "number", "email"].includes(c.type) && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  "placeholder" in c ? c.placeholder : ""
                                }
                                {...field}
                                type={c.type}
                                disabled={loading}
                              />
                            </FormControl>
                            {c.description && (
                              <FormDescription>{c.description}</FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "select" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      c.placeholder
                                        ? c.placeholder
                                        : "Select an option"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {c.options.map((s, i) => {
                                  return (
                                    <SelectItem value={s.value} key={i}>
                                      {s.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "switch" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem className="flex flex-col  gap-1">
                            <FormLabel>
                              {" "}
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <FormControl>
                              <Switch
                                defaultChecked={c.defaultCheckedValue}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>

                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "textarea" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {" "}
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={c.placeholder && c.placeholder}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "checkbox-group" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>
                                {c.label}
                                {c.required && "*"}
                              </FormLabel>
                              <FormDescription>
                                {c.description && c.description}
                              </FormDescription>
                            </div>
                            {c.options.map((item) => (
                              <FormField
                                key={item.value}
                                control={form.control}
                                name={c.id}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.value}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.value
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.value,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) =>
                                                      value !== item.value
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel
                                        className="font-normal 
                                pt-[3px]"
                                      >
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "radio-group" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {c.options.map((o, i) => {
                                  return (
                                    <FormItem
                                      key={i}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={o.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal pt-[3px]">
                                        {o.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "date" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              {c.label}
                              {c.required && "*"}
                            </FormLabel>

                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>{c.datePickerPlaceholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    field.onChange(
                                      date ? date.toISOString() : ""
                                    );
                                  }}
                                  disabled={getDateDisableLogic(
                                    c.dateRestriction
                                  )}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type == "slider" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>
                                {" "}
                                {c.label}
                                {c.required && "*"}
                              </span>
                              <span>
                                {sliderValues[c.id] || c.defaultValue}
                              </span>
                            </FormLabel>
                            <Slider
                              value={[sliderValues[c.id] || c.defaultValue]}
                              onValueChange={(value) => {
                                field.onChange(value[0]);
                                handleSliderChange(c.id, value[0]);
                              }}
                              aria-required={c.required}
                              min={c.baseNumber}
                              defaultValue={[c.defaultValue]}
                              max={c.maxNumber}
                              step={c.steps}
                            />

                            <FormDescription>
                              {c.description && c.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {c.type === "rating" && (
                      <FormField
                        control={form.control}
                        name={c.id}
                        render={({ field }) => {
                          const [hoveredIndex, setHoveredIndex] = useState<
                            number | null
                          >(null);

                          return (
                            <FormItem>
                              <FormLabel>
                                {c.label}
                                {c.required && "*"}
                              </FormLabel>

                              <div className="flex space-x-1">
                                {Array.from({ length: c.length }).map(
                                  (_, i) => {
                                    const isFilled =
                                      i < (hoveredIndex ?? field.value ?? 0);

                                    return (
                                      <Star
                                        key={i}
                                        size={18}
                                        className={`cursor-pointer transition-all icon-yellow ${
                                          isFilled ? " fill-yellow-500" : ""
                                        }`}
                                        onMouseEnter={() =>
                                          setHoveredIndex(i + 1)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredIndex(null)
                                        }
                                        onClick={() => field.onChange(i + 1)}
                                      />
                                    );
                                  }
                                )}
                              </div>

                              <FormDescription>{c.description}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <div className="w-full justify-end flex">
                <Button type="submit" disabled={loading}>
                  {loading && <SvgLoading />}
                  <p className="mt-[0.2rem]">{buttonText}</p>
                </Button>
              </div>
            </form>
          </Form>
          <About />
        </div>
      )}
    </>
  );
};

export default ResponseForm;

const About = () => {
  return (
    <div className="w-full mt-4 items-center justify-center ">
      <div className="max-w-[300px] mx-auto flex gap-1 flex-col text-center my-5">
        <p className="text-muted-foreground text-[14px] font-[500]">
          *Never submit passwords or credit card related information throuh this
          form
        </p>
        <p className="text-regular text-[14px] font-[500]">
          This form is powered by{" "}
          <a href="" className="underline underline-offset-2">
            Gather
          </a>
        </p>
      </div>
    </div>
  );
};
