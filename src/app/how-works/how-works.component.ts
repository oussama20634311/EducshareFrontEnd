import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-works',
  templateUrl: './how-works.component.html',
  styleUrls: ['./how-works.component.scss']
})
export class HowWorksComponent implements OnInit {
  etape : String;
  partgerDocument : String;
  partagerDocumentCorriger : String;
  aiderVosEtudiants : String;
  aiderPlusQueEudiant: string;
  plusDeRevenus : string ;
  obtenirUnCompletement : string ;
  ChercherCeQueVousVoulez : string;
  trouvezDesAnnalesAvecDesCorriges : string ;

  trouverEtAchetezVosDocument : string ;
  choisirEtAcheterLesDocument: string ;
  commencezVotreRevision : string ;
  commencerVotreRevisionAvecLesSupports : string;

  affiche = true ;
  constructor() { }

  ngOnInit(

  ) {

  }

  Display_Professeur() {
   // tslint:disable-next-line:no-unused-expression
   this.affiche = false ;
   this.partgerDocument = 'Partager vos documents';
   this.partagerDocumentCorriger = 'Ayez le plaisir de partager votre passion, vos documents et vos corrigés .';
   this.aiderVosEtudiants = 'AIDER VOS ÉTUDIANTS';
   this.aiderPlusQueEudiant = 'Aider Plus Que 300 000 Étudiants À Réussir Leur Carrière Universitaire.';
   this.plusDeRevenus = 'PLUS DE REVENUS';
   this.obtenirUnCompletement ='Obtenir Un Complément De Revenus En Choisissant Vos Tarifs.';
  
   this.ChercherCeQueVousVoulez = '';
   // tslint:disable-next-line:max-line-length
   this.trouvezDesAnnalesAvecDesCorriges = `` ;
   this.trouverEtAchetezVosDocument = '';
   this.choisirEtAcheterLesDocument = '';
   this.commencezVotreRevision = '';
   this.commencerVotreRevisionAvecLesSupports = '';
  }

  Display_Etudiant() {
   this.affiche = false ;
    console.log('etudiant');

    this.partgerDocument = '';
    this.partagerDocumentCorriger = '';
    this.aiderVosEtudiants = '';
    this.aiderPlusQueEudiant = '';
    this.plusDeRevenus = '';
    this.obtenirUnCompletement = '';

   this.ChercherCeQueVousVoulez = 'CHERCHEZ CE QUE VOUS VOULEZ';
   // tslint:disable-next-line:max-line-length
   this.trouvezDesAnnalesAvecDesCorriges = `Trouvez Des Annales Avec Des Corrigés, Des Fiches De Révision, Des Cours Détaillés Et Des Séries D’exercices Ciblées Aidant À Réussir Vos Examens À L’université.` ;
   this.trouverEtAchetezVosDocument = 'TROUVEZ ET ACHETEZ VOS DOCUMENTS';
   this.choisirEtAcheterLesDocument = 'Choisir Et Acheter Les Documents Les Plus Adéquat À Vos Besoins.';
   this.commencezVotreRevision = 'COMMENCEZ VOTRE RÉVISION';
   this.commencerVotreRevisionAvecLesSupports = 'Commencer Votre Révision Avec Les Supports Nécessaires Pour Célébrer Le Succès .';
  
  }

}
