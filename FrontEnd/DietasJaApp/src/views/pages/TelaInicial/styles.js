import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f7f8fa",
    paddingTop: 20,
  },
  greetingContainer: {
    width: '90%',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  caloriesCard: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  progressCircleContainer: {
    marginBottom: 15,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesRemainingContainer: {
    position: 'absolute',
  },
  caloriesRemainingValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38a69d',
    textAlign: 'center',
  },
  caloriesRemainingLabel: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  calorieInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  calorieInfoBox: {
    alignItems: 'center',
  },
  calorieInfoLabel: {
    fontSize: 14,
    color: '#777',
  },
  calorieInfoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  macrosCard: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  macroRow: {
    marginBottom: 15,
  },
  macroInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  macroLabel: {
    fontSize: 14,
    color: '#555',
  },
  macroValues: {
    fontSize: 14,
    color: '#888',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
});

export default styles;