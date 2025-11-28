import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertReviewSchema, type InsertReview } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ReviewFormProps {
  mcId: string;
}

export function ReviewForm({ mcId }: ReviewFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<InsertReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      mcId,
      name: "",
      rating: 5,
      comment: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertReview) => {
      return apiRequest("POST", "/api/reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews", mcId] });
      toast({
        title: "Ulasan Terkirim!",
        description: "Terima kasih telah memberikan ulasan Anda.",
      });
      form.reset({ mcId, name: "", rating: 5, comment: "" });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal Mengirim Ulasan",
        description: error.message || "Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertReview) => {
    mutation.mutate(data);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full gap-2"
        data-testid="button-open-review-form"
      >
        <Send className="h-4 w-4" />
        Berikan Ulasan
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Berikan Ulasan Anda</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Anda</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} data-testid="input-review-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger data-testid="select-review-rating">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {"⭐".repeat(rating)} {rating} Bintang
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentar</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bagikan pengalaman Anda dengan MC ini..."
                      className="min-h-[100px] resize-none"
                      {...field}
                      data-testid="input-review-comment"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
                data-testid="button-submit-review"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Ulasan"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                data-testid="button-cancel-review"
              >
                Batal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
