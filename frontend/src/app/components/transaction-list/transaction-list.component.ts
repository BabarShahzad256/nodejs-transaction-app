import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: any[] = [];
  displayedColumns: string[] = ['id', 'date', 'comments', 'status', 'actions'];
  transactionForm: FormGroup;

  constructor(private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    if (this.transactionForm.valid) {
      const { startDate, endDate } = this.transactionForm.value;
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      this.transactionService.getTransactions(startTimestamp, endTimestamp).subscribe(data => {
        this.transactions = data;
      });
    }
  }
}
