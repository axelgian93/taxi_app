//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_tariffs_update_by_id_request.g.dart';

/// AdminTariffsUpdateByIdRequest
///
/// Properties:
/// * [city] 
/// * [active] 
/// * [baseFareUsd] 
/// * [perKmUsd] 
/// * [perMinUsd] 
/// * [minFareUsd] 
/// * [nightMultiplier] 
/// * [weekendMultiplier] 
/// * [surgeMultiplier] 
/// * [nightStartHour] 
/// * [nightEndHour] 
/// * [cancellationGraceSec] 
/// * [cancellationFeeAcceptedUsd] 
/// * [cancellationFeeArrivedUsd] 
/// * [notes] 
/// * [deactivateOld] - Si true, desactiva reglas activas previas de la misma ciudad
@BuiltValue()
abstract class AdminTariffsUpdateByIdRequest implements Built<AdminTariffsUpdateByIdRequest, AdminTariffsUpdateByIdRequestBuilder> {
  @BuiltValueField(wireName: r'city')
  String? get city;

  @BuiltValueField(wireName: r'active')
  bool? get active;

  @BuiltValueField(wireName: r'baseFareUsd')
  num? get baseFareUsd;

  @BuiltValueField(wireName: r'perKmUsd')
  num? get perKmUsd;

  @BuiltValueField(wireName: r'perMinUsd')
  num? get perMinUsd;

  @BuiltValueField(wireName: r'minFareUsd')
  num? get minFareUsd;

  @BuiltValueField(wireName: r'nightMultiplier')
  num? get nightMultiplier;

  @BuiltValueField(wireName: r'weekendMultiplier')
  num? get weekendMultiplier;

  @BuiltValueField(wireName: r'surgeMultiplier')
  num? get surgeMultiplier;

  @BuiltValueField(wireName: r'nightStartHour')
  int? get nightStartHour;

  @BuiltValueField(wireName: r'nightEndHour')
  int? get nightEndHour;

  @BuiltValueField(wireName: r'cancellationGraceSec')
  int? get cancellationGraceSec;

  @BuiltValueField(wireName: r'cancellationFeeAcceptedUsd')
  num? get cancellationFeeAcceptedUsd;

  @BuiltValueField(wireName: r'cancellationFeeArrivedUsd')
  num? get cancellationFeeArrivedUsd;

  @BuiltValueField(wireName: r'notes')
  String? get notes;

  /// Si true, desactiva reglas activas previas de la misma ciudad
  @BuiltValueField(wireName: r'deactivateOld')
  bool? get deactivateOld;

  AdminTariffsUpdateByIdRequest._();

  factory AdminTariffsUpdateByIdRequest([void updates(AdminTariffsUpdateByIdRequestBuilder b)]) = _$AdminTariffsUpdateByIdRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminTariffsUpdateByIdRequestBuilder b) => b
      ..active = true
      ..nightMultiplier = 1
      ..weekendMultiplier = 1
      ..surgeMultiplier = 1
      ..deactivateOld = true;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminTariffsUpdateByIdRequest> get serializer => _$AdminTariffsUpdateByIdRequestSerializer();
}

class _$AdminTariffsUpdateByIdRequestSerializer implements PrimitiveSerializer<AdminTariffsUpdateByIdRequest> {
  @override
  final Iterable<Type> types = const [AdminTariffsUpdateByIdRequest, _$AdminTariffsUpdateByIdRequest];

  @override
  final String wireName = r'AdminTariffsUpdateByIdRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminTariffsUpdateByIdRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.city != null) {
      yield r'city';
      yield serializers.serialize(
        object.city,
        specifiedType: const FullType(String),
      );
    }
    if (object.active != null) {
      yield r'active';
      yield serializers.serialize(
        object.active,
        specifiedType: const FullType(bool),
      );
    }
    if (object.baseFareUsd != null) {
      yield r'baseFareUsd';
      yield serializers.serialize(
        object.baseFareUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.perKmUsd != null) {
      yield r'perKmUsd';
      yield serializers.serialize(
        object.perKmUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.perMinUsd != null) {
      yield r'perMinUsd';
      yield serializers.serialize(
        object.perMinUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.minFareUsd != null) {
      yield r'minFareUsd';
      yield serializers.serialize(
        object.minFareUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.nightMultiplier != null) {
      yield r'nightMultiplier';
      yield serializers.serialize(
        object.nightMultiplier,
        specifiedType: const FullType(num),
      );
    }
    if (object.weekendMultiplier != null) {
      yield r'weekendMultiplier';
      yield serializers.serialize(
        object.weekendMultiplier,
        specifiedType: const FullType(num),
      );
    }
    if (object.surgeMultiplier != null) {
      yield r'surgeMultiplier';
      yield serializers.serialize(
        object.surgeMultiplier,
        specifiedType: const FullType(num),
      );
    }
    if (object.nightStartHour != null) {
      yield r'nightStartHour';
      yield serializers.serialize(
        object.nightStartHour,
        specifiedType: const FullType(int),
      );
    }
    if (object.nightEndHour != null) {
      yield r'nightEndHour';
      yield serializers.serialize(
        object.nightEndHour,
        specifiedType: const FullType(int),
      );
    }
    if (object.cancellationGraceSec != null) {
      yield r'cancellationGraceSec';
      yield serializers.serialize(
        object.cancellationGraceSec,
        specifiedType: const FullType(int),
      );
    }
    if (object.cancellationFeeAcceptedUsd != null) {
      yield r'cancellationFeeAcceptedUsd';
      yield serializers.serialize(
        object.cancellationFeeAcceptedUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.cancellationFeeArrivedUsd != null) {
      yield r'cancellationFeeArrivedUsd';
      yield serializers.serialize(
        object.cancellationFeeArrivedUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.notes != null) {
      yield r'notes';
      yield serializers.serialize(
        object.notes,
        specifiedType: const FullType(String),
      );
    }
    if (object.deactivateOld != null) {
      yield r'deactivateOld';
      yield serializers.serialize(
        object.deactivateOld,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminTariffsUpdateByIdRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminTariffsUpdateByIdRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'city':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.city = valueDes;
          break;
        case r'active':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.active = valueDes;
          break;
        case r'baseFareUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.baseFareUsd = valueDes;
          break;
        case r'perKmUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.perKmUsd = valueDes;
          break;
        case r'perMinUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.perMinUsd = valueDes;
          break;
        case r'minFareUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.minFareUsd = valueDes;
          break;
        case r'nightMultiplier':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.nightMultiplier = valueDes;
          break;
        case r'weekendMultiplier':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.weekendMultiplier = valueDes;
          break;
        case r'surgeMultiplier':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.surgeMultiplier = valueDes;
          break;
        case r'nightStartHour':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.nightStartHour = valueDes;
          break;
        case r'nightEndHour':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.nightEndHour = valueDes;
          break;
        case r'cancellationGraceSec':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.cancellationGraceSec = valueDes;
          break;
        case r'cancellationFeeAcceptedUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.cancellationFeeAcceptedUsd = valueDes;
          break;
        case r'cancellationFeeArrivedUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.cancellationFeeArrivedUsd = valueDes;
          break;
        case r'notes':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.notes = valueDes;
          break;
        case r'deactivateOld':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.deactivateOld = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminTariffsUpdateByIdRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminTariffsUpdateByIdRequestBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

