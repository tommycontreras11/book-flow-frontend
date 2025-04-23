"use client";

import { BookLoanCard } from "@/components/common/card/book-loan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { useGetAllLoanManagement } from "@/hooks/api/loan-management";
import { useCreateLoanManagement } from "@/mutations/api/loans-management";
import { ICreateLoanManagement } from "@/providers/http/loans-management/interface";
import { BookMarked, BookOpen } from "lucide-react";
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
    () => loans?.find((l) => l.status === LoanManagementEnum.RETURNED),
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
          {loans?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookMarked className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No books borrowed yet
              </h3>
              <p>Books you've borrowed will appear here</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {loans &&
                loans
                  .filter((l) => l.status !== LoanManagementEnum.RETURNED)
                  .map((loan) => {
                    let dateLoan = new Date(loan.date_loan);
                    dateLoan.setDate(dateLoan.getDate() + loan.quantity_day);

                    loan.date_loan = dateLoan;

                    return (
                      <BookLoanCard
                        key={loan.uuid}
                        loan={loan}
                        isBookReturned={false}
                        bookReturnedLoanNumber={bookReturned?.loan_number}
                        handleSubmit={handleSubmit}
                      />
                    );
                  })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {isAnyBookReturned ? (
            <div className="grid gap-6 md:grid-cols-2">
              {loans &&
                loans
                  .filter((l) => l.status === LoanManagementEnum.RETURNED)
                  .map((loan) => (
                    <BookLoanCard
                      key={loan.uuid}
                      loan={loan}
                    />
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
