import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ICreateLoanManagement,
  ILoanManagement,
} from "@/providers/http/loans-management/interface";
import { Calendar } from "lucide-react";

export function BookLoanCard({
  loan,
  bookReturnedLoanNumber,
  isBookReturned = true,
  handleSubmit,
}: {
  loan: ILoanManagement;
  bookReturnedLoanNumber?: string;
  isBookReturned?: boolean;
  handleSubmit?: (formData: Partial<ICreateLoanManagement>) => void;
}) {
  return (
    <Card key={loan.uuid}>
      <div className="flex gap-4 p-6">
        <div className="w-24 h-32 relative">
          <img
            src={loan.request.book.url}
            alt={loan.request.book.name}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle className="text-xl">{loan.request.book.name}</CardTitle>
            <p className="text-muted-foreground">
              {loan.request.book.authors[0].name}
            </p>
          </CardHeader>
          {!isBookReturned && (
            <>
              <CardContent className="p-0 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Due {loan.date_loan.toDateString()}
                </div>
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground mb-1">
                    Reading Progress: {loan.due_date_progress}%
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${loan.due_date_progress}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              {bookReturnedLoanNumber !== loan.loan_number && (
                <CardFooter className="p-0 mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      handleSubmit &&
                      handleSubmit({ requestUUID: loan.request.uuid })
                    }
                  >
                    Return Book
                  </Button>
                </CardFooter>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
