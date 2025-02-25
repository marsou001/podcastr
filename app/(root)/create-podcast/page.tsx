"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { VoiceType } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"

const voiceTypes: VoiceType[] = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
})

function CreatePodcast() {
  const [voiceType, setVoiceType] = useState<VoiceType>("alloy");
  const [isSubmitting, setIsSubmitting] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
    },
  })
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  function handleVoiceTypeChange(value: VoiceType) {
    setVoiceType(value);
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-white-1 text-base leading-normal font-bold">Podcast title</FormLabel>
                  <FormControl>
                    <Input placeholder="JSM Pro Podcast" {...field} className="text-gray-1 text-base leading-normal placeholder:text-base placeholder:leading-normal bg-black-1 border-none focus-visible:ring-orange-1 rounded-[6px]" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-white-1 font-bold">
                Select AI Voice
              </Label>
              <Select onValueChange={handleVoiceTypeChange}>
                <SelectTrigger className={cn("text-gray-1 bg-black-1 text-base leading-normal w-full border-none focus-visible:ring-orange-1")}>
                  <SelectValue placeholder="Select AI Voice" />
                </SelectTrigger>
                <SelectContent className="text-white-1 bg-black-1 text-base leading-normal font-bold border-none focus:ring-orange-1">
                  {voiceTypes.map((voiceType) => (
                    <SelectItem key={voiceType} value={voiceType} className="capitalize focus:text-white-1 focus:bg-orange-1">{ voiceType }</SelectItem>
                  ))}
                </SelectContent>
                
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-white-1 text-base leading-normal font-bold">Podcast description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a short podcast description" {...field} className="text-gray-1 text-base leading-normal placeholder:text-base placeholder:leading-normal bg-black-1 border-none focus-visible:ring-orange-1 rounded-[6px]" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcast />
            <GenerateThumbnail />

            <div className="mt-10 w-full">
              <Button type="submit" className="text-white-1 bg-orange-1 hover:bg-black-1 text-base font-extrabold leading-normal w-full py-4 cursor-pointer transition-all duration-500">
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin" />
                  </>
                ) : "Submit & Publish Podcast"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast;