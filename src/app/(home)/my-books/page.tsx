"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { useGetAllLoanManagement } from "@/hooks/api/loan-management";
import { useCreateLoanManagement } from "@/mutations/api/loans-management";
import { ICreateLoanManagement } from "@/providers/http/loans-management/interface";
import { BookMarked, BookOpen, Calendar } from "lucide-react";
import { useMemo } from "react";

export default function MyBooks() {
  const {
    data: loans,
    isLoading: isLoadingLoan,
    refetch,
  } = useGetAllLoanManagement();
  const { mutate: createLoanManagement } = useCreateLoanManagement(() => {
    refetch();
  });

  const isAnyBookReturned = useMemo(
    () => loans?.some((l) => l.status === LoanManagementEnum.RETURNED),
    [loans]
  );

  const bookReturned = useMemo(
    () =>
      loans?.find((l) => l.status === LoanManagementEnum.RETURNED)?.loan_number,
    [loans]
  );

  const saveLoanManagement = (
    loanManagement: Partial<ICreateLoanManagement>
  ) => {
    createLoanManagement(loanManagement);
  };

  const handleSubmit = async (formData: Partial<ICreateLoanManagement>) => {
    saveLoanManagement({ ...formData });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
      </div>

      <Tabs defaultValue="borrowed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="borrowed">
            <BookOpen className="h-4 w-4 mr-2" />
            Currently Borrowed
          </TabsTrigger>
          <TabsTrigger value="history">
            <BookMarked className="h-4 w-4 mr-2" />
            Loan History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="borrowed" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {loans &&
              loans
                .filter((l) => l.status !== LoanManagementEnum.RETURNED)
                .map((loan) => {
                  let dateLoan = new Date(loan.date_loan);
                  dateLoan.setDate(dateLoan.getDate() + loan.quantity_day);
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
                            <CardTitle className="text-xl">
                              {loan.request.book.name}
                            </CardTitle>
                            <p className="text-muted-foreground">
                              {loan.request.book.authors[0].name}
                            </p>
                          </CardHeader>
                          <CardContent className="p-0 mt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              Due {dateLoan.toDateString()}
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
                          {bookReturned !== loan.loan_number && (
                            <CardFooter className="p-0 mt-4">
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                  handleSubmit({
                                    requestUUID: loan.request.uuid,
                                  })
                                }
                              >
                                Return Book
                              </Button>
                            </CardFooter>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </TabsContent>

        <TabsContent value="history">
          {isAnyBookReturned ? (
            <div className="grid gap-6 md:grid-cols-2">
              {loans &&
                loans
                  .filter((l) => l.status === LoanManagementEnum.RETURNED)
                  .map((loan) => (
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
                            <CardTitle className="text-xl">
                              {loan.request.book.name}
                            </CardTitle>
                            <p className="text-muted-foreground">
                              {loan.request.book.authors[0].name}
                            </p>
                          </CardHeader>
                        </div>
                      </div>
                    </Card>
                  ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookMarked className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No loan history yet</h3>
              <p>Books you've returned will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
