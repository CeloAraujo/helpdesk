import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: 'app-chamado-view',
  templateUrl: "./chamado-view.component.html",
  styleUrls: ["./chamado-view.component.css"],
})
export class ChamadoViewComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  chamadoForm: FormGroup;
  clientes: Cliente[];
  tecnicos: Tecnico[];
  valoresIniciais: {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    observacoes: string;
    tecnico: string;
    cliente: string;
    nomeCliente: string;
    nomeTecnico: string;
  };

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.chamadoForm = this.fb.group({
      prioridade: [{ value: null, disabled: true }, [Validators.required]],
      status: [{ value: null, disabled: true }, [Validators.required]],
      titulo: [{ value: null, disabled: true }, [Validators.required]],
      observacoes: [{ value: null, disabled: true }, [Validators.required]],
      tecnico: [{ value: null, disabled: true }, [Validators.required]],
      cliente: [{ value: null, disabled: true }, [Validators.required]],
    });

    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.chamadoForm.disabled
    this.findAllClientes();
    this.findAllTecnicos();

  }
  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(
      (resposta) => {
        this.chamado = resposta;
        this.chamadoForm.patchValue(this.chamado); 
        console.log(this.chamadoForm.value);
        this.valoresIniciais = { ...this.chamadoForm.value };
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }
  
  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }
  retornaPrioridade(prioridade: any): string {
    const prioridadeStr = prioridade.toString(); 
    if (prioridadeStr === "0") {
      return "BAIXA";
    } else if (prioridadeStr === "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
}

}
