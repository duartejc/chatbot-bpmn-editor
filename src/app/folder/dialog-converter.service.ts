import { Injectable } from '@angular/core';
import { FlowNode } from 'bpmn-moddle';
import { AnswerUtter, Dialog, QuestionIntent } from '../dialog.service';

@Injectable({
  providedIn: 'root'
})
export class DialogConverterService {


  constructor() { }

  convert(caminhoOriginal: FlowNode[]): Dialog {
      const dialogo = { id: '', name: '' } as Dialog;

      const caminho = caminhoOriginal.map(item => {

        switch (item.$type) {
          case 'bpmn:SequenceFlow':
          case 'bpmn:StartEvent':
            return { id: item.id.replace(/-/g, ''), description: item.name, type: 'QuestionIntent' } as QuestionIntent;
            break;
          case 'bpmn:ExclusiveGateway':
          case 'bpmn:Task':
          case 'bpmn:EndEvent':
            return { id: item.id.replace(/-/g, ''), description: item.name, type: 'AnswerUtter' } as AnswerUtter;
            break;
        }

      });

      dialogo.items = caminho;

      return dialogo;
  }
}
