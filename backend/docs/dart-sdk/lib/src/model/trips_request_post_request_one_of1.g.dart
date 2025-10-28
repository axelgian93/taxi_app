// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post_request_one_of1.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPostRequestOneOf1 extends TripsRequestPostRequestOneOf1 {
  @override
  final String? city;
  @override
  final TripsRequestPostRequestOneOf1Origin origin;
  @override
  final TripsRequestPostRequestOneOf1Origin destination;
  @override
  final num? distanceKm;
  @override
  final int? durationMin;
  @override
  final int? searchRadiusM;
  @override
  final int? locationMaxAgeMin;

  factory _$TripsRequestPostRequestOneOf1(
          [void Function(TripsRequestPostRequestOneOf1Builder)? updates]) =>
      (TripsRequestPostRequestOneOf1Builder()..update(updates))._build();

  _$TripsRequestPostRequestOneOf1._(
      {this.city,
      required this.origin,
      required this.destination,
      this.distanceKm,
      this.durationMin,
      this.searchRadiusM,
      this.locationMaxAgeMin})
      : super._();
  @override
  TripsRequestPostRequestOneOf1 rebuild(
          void Function(TripsRequestPostRequestOneOf1Builder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPostRequestOneOf1Builder toBuilder() =>
      TripsRequestPostRequestOneOf1Builder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPostRequestOneOf1 &&
        city == other.city &&
        origin == other.origin &&
        destination == other.destination &&
        distanceKm == other.distanceKm &&
        durationMin == other.durationMin &&
        searchRadiusM == other.searchRadiusM &&
        locationMaxAgeMin == other.locationMaxAgeMin;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, city.hashCode);
    _$hash = $jc(_$hash, origin.hashCode);
    _$hash = $jc(_$hash, destination.hashCode);
    _$hash = $jc(_$hash, distanceKm.hashCode);
    _$hash = $jc(_$hash, durationMin.hashCode);
    _$hash = $jc(_$hash, searchRadiusM.hashCode);
    _$hash = $jc(_$hash, locationMaxAgeMin.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPostRequestOneOf1')
          ..add('city', city)
          ..add('origin', origin)
          ..add('destination', destination)
          ..add('distanceKm', distanceKm)
          ..add('durationMin', durationMin)
          ..add('searchRadiusM', searchRadiusM)
          ..add('locationMaxAgeMin', locationMaxAgeMin))
        .toString();
  }
}

class TripsRequestPostRequestOneOf1Builder
    implements
        Builder<TripsRequestPostRequestOneOf1,
            TripsRequestPostRequestOneOf1Builder> {
  _$TripsRequestPostRequestOneOf1? _$v;

  String? _city;
  String? get city => _$this._city;
  set city(String? city) => _$this._city = city;

  TripsRequestPostRequestOneOf1OriginBuilder? _origin;
  TripsRequestPostRequestOneOf1OriginBuilder get origin =>
      _$this._origin ??= TripsRequestPostRequestOneOf1OriginBuilder();
  set origin(TripsRequestPostRequestOneOf1OriginBuilder? origin) =>
      _$this._origin = origin;

  TripsRequestPostRequestOneOf1OriginBuilder? _destination;
  TripsRequestPostRequestOneOf1OriginBuilder get destination =>
      _$this._destination ??= TripsRequestPostRequestOneOf1OriginBuilder();
  set destination(TripsRequestPostRequestOneOf1OriginBuilder? destination) =>
      _$this._destination = destination;

  num? _distanceKm;
  num? get distanceKm => _$this._distanceKm;
  set distanceKm(num? distanceKm) => _$this._distanceKm = distanceKm;

  int? _durationMin;
  int? get durationMin => _$this._durationMin;
  set durationMin(int? durationMin) => _$this._durationMin = durationMin;

  int? _searchRadiusM;
  int? get searchRadiusM => _$this._searchRadiusM;
  set searchRadiusM(int? searchRadiusM) =>
      _$this._searchRadiusM = searchRadiusM;

  int? _locationMaxAgeMin;
  int? get locationMaxAgeMin => _$this._locationMaxAgeMin;
  set locationMaxAgeMin(int? locationMaxAgeMin) =>
      _$this._locationMaxAgeMin = locationMaxAgeMin;

  TripsRequestPostRequestOneOf1Builder() {
    TripsRequestPostRequestOneOf1._defaults(this);
  }

  TripsRequestPostRequestOneOf1Builder get _$this {
    final $v = _$v;
    if ($v != null) {
      _city = $v.city;
      _origin = $v.origin.toBuilder();
      _destination = $v.destination.toBuilder();
      _distanceKm = $v.distanceKm;
      _durationMin = $v.durationMin;
      _searchRadiusM = $v.searchRadiusM;
      _locationMaxAgeMin = $v.locationMaxAgeMin;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPostRequestOneOf1 other) {
    _$v = other as _$TripsRequestPostRequestOneOf1;
  }

  @override
  void update(void Function(TripsRequestPostRequestOneOf1Builder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPostRequestOneOf1 build() => _build();

  _$TripsRequestPostRequestOneOf1 _build() {
    _$TripsRequestPostRequestOneOf1 _$result;
    try {
      _$result = _$v ??
          _$TripsRequestPostRequestOneOf1._(
            city: city,
            origin: origin.build(),
            destination: destination.build(),
            distanceKm: distanceKm,
            durationMin: durationMin,
            searchRadiusM: searchRadiusM,
            locationMaxAgeMin: locationMaxAgeMin,
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'origin';
        origin.build();
        _$failedField = 'destination';
        destination.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'TripsRequestPostRequestOneOf1', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
